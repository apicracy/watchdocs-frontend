import deepEqual from 'deep-equal';
import generateSchema from 'generate-schema';
import traverse from 'traverse';
import { pull, flattenDeep, difference } from 'lodash/array';
import { cloneDeep, isEmpty } from 'lodash/lang';
import { keys } from 'lodash/object';

export function calculateRequired(base, draft) {
  const resultSchema = cloneDeep(draft);
  if (base.type !== draft.type) {
    return fillSchemaWithRequired(draft);
  }

  if (base.type === 'object') {
    resultSchema.required = calculateObjectRequired(base, draft);

    keys(draft.properties).forEach((prop) => {
      if (!base.properties[prop]) {
        return null;
      }
      resultSchema.properties[prop] = calculateRequired(
        base.properties[prop],
        draft.properties[prop],
      );
      return null;
    });
  }

  if (base.type === 'array') {
    resultSchema.items = calculateRequired(base.items, draft.items);
  }

  return resultSchema;
}

const calculateObjectRequired = (base, draft) => {
  const baseProperties = keys(base.properties);
  const draftProperties = keys(draft.properties);

  const removedProperties = difference(baseProperties, draftProperties);
  const newProperties = difference(draftProperties, baseProperties);

  return difference(base.required, removedProperties)
         .concat(newProperties);
};

export function fillSchemaWithRequired(schema) {
  const resultSchema = schema;
  traverse(resultSchema).forEach(function () {
    if (this.node.type === 'object') {
      const node = this.node;
      node.required = keys(node.properties);
      this.update(node);
    }
  });

  return resultSchema;
}

export function indexSchemaNodes(schema) {
  const resultSchema = schema;
  let nodeId = 0;
  traverse(resultSchema).forEach(function () {
    if (this.node.type) {
      const node = this.node;
      node.nodeId = nodeId;
      this.update(node);
      nodeId += 1;
    }
  });

  return resultSchema;
}

export function changeRequiredForNode(schema, nodeId) {
  const resultSchema = schema;
  traverse(resultSchema).forEach(function () {
    if (this.node.nodeId === nodeId) {
      const parentNode = this.parent.parent.node;
      if (parentNode.required && parentNode.required.includes(this.key)){
        pull(parentNode.required, this.key);
      } else {
        if (!parentNode.required) {
          parentNode.required = [];
        }
        parentNode.required.push(this.key);
      }
      this.parent.parent.update(parentNode, true);
    }
  });

  return resultSchema;
}

export function cleanJSONSchema(output) {
  const specialProps = [
    'differenceId', 'toRemove', 'toAdd', 'isAccepted', 'requiredChanged',
    'typeChanged', 'newType', 'onChangeRequired', 'oldSchema', 'nodeId',
  ];
  const newOutput = Array.isArray(output) ?
    [].concat(output) :
    Object.assign({}, output);

  if (typeof newOutput === 'object') {
    Object.keys(newOutput).map((prop) => {
      if (typeof newOutput[prop] === 'object') {
        newOutput[prop] = cleanJSONSchema(newOutput[prop]);
      }
      if (newOutput[prop] === null) {
        delete newOutput[prop];
      }
      if (specialProps.includes(prop)) {
        delete newOutput[prop];
      }

      return null;
    });
  }

  return newOutput;
}

export function isResolved(linesOfCode) {
  const lines = flattenDeep(linesOfCode);
  const hasConflicts = lines.some(function (line) {
    return line.toAdd || line.toRemove;
  });

  return !hasConflicts;
}

export function acceptChange(resultSchema, groupToAccept) {
  const newResultSchema = resultSchema;
  const differenceId = groupToAccept.find(line => line.differenceId >= 0)
                                    .differenceId;

  traverse(newResultSchema).forEach(function () {
    if (this.node.differenceId === differenceId) {
      const changedProperty = this.node;

      if (changedProperty.toAdd) {
        changedProperty.toAdd = false;
        changedProperty.isAccepted = true;
        this.update(changedProperty);
      } else if (changedProperty.toRemove) {
        this.delete(true);
      } else if (changedProperty.requiredChanged) {
        changedProperty.requiredChanged = false;
        changedProperty.isAccepted = true;
        this.update(changedProperty);
      } else if (changedProperty.typeChanged) {
        changedProperty.typeChanged = false;
        changedProperty.isAccepted = true;
        this.update(changedProperty);
      }
    }
  });

  return newResultSchema;
}

export function rejectChange(resultSchema, groupToAccept) {
  const newResultSchema = resultSchema;
  const differenceId = groupToAccept.find(line => line.differenceId).differenceId;

  traverse(newResultSchema).forEach(function () {
    if (this.node.differenceId === differenceId) {
      const changedProperty = this.node;

      if (changedProperty.toRemove) {
        changedProperty.toRemove = false;
        this.update(changedProperty);
      } else if (changedProperty.toAdd) {
        this.delete(true);
      } else if (changedProperty.requiredChanged) {
        // remove from required list of parent
        const parentRequired = this.parent.parent.node;
        pull(parentRequired.required, this.key);
        this.parent.parent.update(parentRequired);

        changedProperty.requiredChanged = false;
        this.update(changedProperty);
      } else if (changedProperty.typeChanged) {
        this.update(changedProperty.oldSchema);
      }
    }
  });

  return newResultSchema;
}

export function compareJSONSchemas(base, draft) {
  const output = compare(base, draft);
  return output;
}


// This is a refactoring candidate
// What is does is it compares two json schemas
// The output is a json schema based on draft
// with custom properties which tells about differences.
// Custom properties:
//
// differenceId - unique id of a difference on node
// toAdd - new node from draft
// toRemove - missing node from draft
// typeChanged - node type changed in draft
// requiredChanged - node required changed in draft,
//                   it becomes required or no longer required
// oldSchema - if type changed it stores schema for node from base

let i = 0;
export function compare(base, draft) {
  if (isEmpty(draft) && isEmpty(base)) {
    return {};
  }
  if (isEmpty(draft)) {
    return base;
  }
  if (isEmpty(base)) {
    return draft;
  }

  const output = cloneDeep(draft);

  // Check for node type change
  if (base.type !== draft.type) {
    if (draft.type === 'object') {
      output.properties.toAdd = true;
      output.properties.differenceId = i;
      i += 1;
    } else if (draft.type === 'array') {
      output.items.toAdd = true;
      output.items.differenceId = i;
      i += 1;
    } else {
      output.type = draft.type;
      output.oldSchema = base;
      output.typeChanged = true;
      output.differenceId = i;
      i += 1;
    }
  }

  if (draft.properties) {
    // check props
    Object.keys(draft.properties).map((prop) => {
      if (!base.properties || !deepEqual(draft.properties[prop], base.properties[prop])) {
        if (!base.properties || !base.properties[prop]) {
          output.properties[prop].toAdd = true;
          output.properties[prop].differenceId = i;
          i += 1;
        } else {
          output.properties[prop] = compare(base.properties[prop], draft.properties[prop]);
        }
      }

      return null;
    });

    if (base.properties) {
      Object.keys(base.properties).map((prop) => {
        if (!deepEqual(draft.properties[prop], base.properties[prop])) {
          if (!draft.properties[prop]) {
            output.properties[prop] = base.properties[prop];
            output.properties[prop].toRemove = true;
            output.properties[prop].differenceId = i;
            i += 1;
          } else {
            output.properties[prop] = compare(base.properties[prop], draft.properties[prop]);
          }
        }

        return null;
      });
    }
    /* eslint no-array-constructor: 0 */
    // TODO: Not sure if correct. Output should have draft required list
    if (base.required) {
      output.required = [].concat(base.required);
    }

    // check required
    if (!deepEqual(draft.required, base.required)) {
      if (draft.required) {
        draft.required.map((reqField) => {
          if (((!base.required || base.required.indexOf(reqField) === -1) &&
            !output.properties[reqField].toAdd)) {
            output.properties[reqField].requiredChanged = true;
            output.properties[reqField].differenceId = i;
            i += 1;
          }
          return null;
        });
      }

      if (base.required) {
        base.required.map((reqField) => {
          if ((output.properties[reqField] &&
            (!draft.required || draft.required.indexOf(reqField) === -1) &&
            (!output.properties[reqField].toRemove))) {
            output.properties[reqField].requiredChanged = true;
            output.properties[reqField].differenceId = i;
            i += 1;
          }
          return null;
        });
      }
    }
  }

  if (draft.type === 'array') {
    output.items = compare(base.items, draft.items);
  }

  return output;
}

export function JSONtoJSONSchema(json) {
  try {
    const obj = JSON.parse(json);
    const schema = generateSchema.json(obj);

    return schema;
  } catch (e) {
    return null;
  }
}

// This function generates lines of diff where changes are groupped
// Each line is marked with the following lines:
//
// toRemove - means line is to be removed
// toAdd - means line is to be added
// toChange - means line is to be removed or added
// as type or required changed
//
// Eg. If you have the following diff
// {
// - "type": "string",
// + "new_type": "string"
// - "type_changed": "string",
// + "type_changed": "integer"
// }
// It will return
// [
//   Object(line: "{"),
//   [
//     Object(line: '"type": "string"', toRemove: true),
//     Object(line: '"new_type": "string"', toAdd: false)
//   ],
//   [
//     Object(line: '"type_changed": "string"', toChange: true, toRemove: true),
//     Object(line: '"type_changed": "string"', toChange: true, toAdd: false)
//   ],
//   Object(line: "{")
// ]
export function JSONSchemaToJSONLines(schema) {
  let JSONObject = [];
  if (schema) {
    JSONObject = getLines('', schema, true, 0);
  }
  return JSONObject;
}

function getLines(name, schema, isReq, space, toAdd, toRemove, toChange, isAccepted, comma) {
  if (!schema){
    return []
  }
  const lineToChange = toChange || schema.typeChanged || schema.requiredChanged;
  // line could be marked to remove/add by itself (from schema) or by parent
  const lineToAdd = toAdd || schema.toAdd || (lineToChange && !toRemove);
  const lineToRemove = toRemove || schema.toRemove;

  let lines;
  switch (schema.type) {
    case 'object': lines = getObjectLine(name, schema, isReq, space, lineToAdd, lineToRemove, lineToChange, isAccepted, comma); break;
    case 'array': lines = getArrayLine(name, schema, isReq, space, lineToAdd, lineToRemove, lineToChange, isAccepted, comma); break;
    default: lines = getSingleLine(name, schema, isReq, space, lineToAdd, lineToRemove, lineToChange, isAccepted, comma);
  }
  lines = [].concat(lines);

  // when line has changed place old version before the new one
  if (lineToChange && !toRemove) {
    lines = [].concat(oldLines(name, schema, isReq, space, comma)).concat(lines);
  }

  // if node has changed group new lines and old lines together
  if (schema.toAdd || schema.toRemove || schema.typeChanged) {
    return [lines];
  }

  // protect from grouping whole node when require changed
  // it should group only first node line
  if (schema.requiredChanged) {
    const [oldRequired, newRequired, ...unchanged] = lines
    return [[oldRequired, newRequired], ...unchanged];
  }
  return lines;
}

const oldLines = (name, schema, isReq, space, comma) => {
  if (schema.typeChanged) {
    return getLines(name, schema.oldSchema, isReq, space, false, true, true, true, false, comma);
  }
  if (schema.requiredChanged) {
    const oldSchema = Object.assign({}, schema);
    oldSchema.requiredChanged = false;
    return getLines(name, oldSchema, !isReq, space, false, true, true, true, false, comma)[0];
  }
  // TODO: Handle case when both type and required has changed
  return [];
};

const getObjectLine = (name, schema, isReq, space, toAdd, toRemove, toChange, isAccepted, comma) => {
  let lines = [];
  lines.push(getSingleLine(name, schema, isReq, space, toAdd, toRemove,
                           toChange, isAccepted, false));

  if (schema.requiredChanged && !schema.typeChanged) {
    // prevent items to be marked to add if only required changed
    // Warning: HACK. To be refactored
    toAdd = false;
    toChange = false;
  }
  lines = lines.concat(...objectPropertiesLines(schema, space, toAdd, toRemove,
                                                toChange, isAccepted));
  lines.push(closingSymbolLine('}', schema, space, comma, toAdd, toRemove,
                               toChange, isAccepted));

  return lines;
};

const objectPropertiesLines = (schema, space, toAdd, toRemove, toChange, isAccepted) => {
  if (!schema.properties) {
    return [];
  }
  const keys = Object.keys(schema.properties);

  return (
    keys.map((prop, index) => {
      let isReqProp = false;
      if (schema.required) {
        isReqProp = schema.required.indexOf(prop) > -1;
      }
      return getLines(prop, schema.properties[prop], isReqProp, space + 2,
        (toAdd || schema.toAdd), (toRemove || schema.toRemove),
        toChange, (isAccepted || schema.isAccepted), index !== keys.length - 1);
    })
  );
};


const getArrayLine = (name, schema, isReq, space, toAdd, toRemove, toChange, isAccepted, comma) => {
  let lines = [];
  lines.push(getSingleLine(name, schema, isReq, space, toAdd, toRemove, toChange, isAccepted, false));

  if (schema.requiredChanged && !schema.typeChanged) {
    // prevent items to be marked to add if only required changed
    // Warning: HACK. To be refactored
    toAdd = false;
    toChange = false;
  }

  const arrayItemsLines = getLines('', schema.items, null, space + 2,
    toAdd, toRemove, toChange, (isAccepted || schema.isAccepted), false);
  lines = lines.concat(arrayItemsLines);

  lines.push(closingSymbolLine(']', schema, space, comma, toAdd, toRemove, toChange, isAccepted));

  return lines;
};


const getSingleLine = (name, schema, isReq, space, toAdd, toRemove, toChange, isAccepted, comma) => (
  {
    id: Math.random(),
    isOpt: !isReq,
    isReq,
    toAdd,
    toRemove,
    toChange,
    differenceId: schema.differenceId,
    nodeId: schema.nodeId,
    type: schema.type,
    line: textLine(name, schema, space, comma),
    isAccepted: isAccepted || schema.isAccepted,
  }
);

const closingSymbolLine = (symbol, schema, space, comma, toAdd, toRemove, toChange, isAccepted) => {
  const id = Math.random();
  const pre = ' '.repeat(space);
  const line = `${pre}${symbol}${comma ? ',' : ''}`;
  return {
    id,
    line,
    toAdd,
    toRemove,
    toChange,
    isAccepted: isAccepted || schema.isAccepted,
  };
};

const textLine = (name, schema, space, comma) => {
  let text = ' '.repeat(space);
  text += (name !== '') ? `"${name}": ` : '';
  text += propertyValue(schema.type, schema.default);
  text += comma ? ',' : '';
  return text;
};

const propertyValue = (type, schemaDefault) => {
  switch (type) {
    /* eslint no-use-before-define: 0 */
    case 'object': return '{';
    case 'array': return '[';
    case 'string': return `"${schemaDefault || 'LOREM IPSUM'}"`;
    case 'integer': return `${schemaDefault || '7262325'}`;
    case 'number': return `${schemaDefault || '7262325'}`;
    case 'null': return `${schemaDefault || null}`;
    case 'boolean': return `${schemaDefault || true}`;
    default: return '';
  }
};
