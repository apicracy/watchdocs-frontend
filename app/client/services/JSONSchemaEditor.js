import deepEqual from 'deep-equal';
import generateSchema from 'generate-schema';
import traverse from 'traverse';
import { pull } from 'lodash/array';

export function cleanJSONSchema(output) {
  const specialProps = [
    'differenceId', 'toRemove', 'toAdd', 'isAccepted', 'requiredChanged',
    'typeChanged', 'newType', 'onChangeRequired',
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

export function acceptChange(resultSchema, groupToAccept) {
  const newResultSchema = resultSchema;
  const differenceId = groupToAccept.find(line => line.differenceId).differenceId;

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
        debugger;
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

export function compareJSONSchema(base, draft) {
  const output = compare(base, draft);
  return output;
}


let i = 0;

export function compare(base, draft) {
  // if one of them is empty
  if (base && !draft) {
    const newBase = base;
    return newBase;
  }

  if (draft && !base) {
    const newDraft = draft;
    return newDraft;
  }

  if (!draft && !base) {
    return undefined;
  }

  // if we have two of them
  const output = Object.assign({}, draft);

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

  if (draft.type === 'object') {
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
export function JSONSchemaToJSON(schema) {
  let JSONObject = [];
  if (schema) {
    JSONObject = getLines('', schema, true, 0);
  }
  return JSONObject;
}

function getLines(name, schema, isReq, space, toAdd, toRemove, toChange, isAccepted, comma) {
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
  if (schema.toAdd || schema.toRemove || schema.typeChanged || schema.requiredChanged) {
    return [lines];
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
  lines.push(getSingleLine(name, schema, isReq, space, toAdd, toRemove, toChange, isAccepted, comma));

  if (schema.requiredChanged && !schema.typeChanged) {
    // prevent items to be marked to add if only required changed
    // Warning: HACK. To be refactored
    toAdd = false;
    toChange = false;
  }
  lines = lines.concat(...objectPropertiesLines(schema, space, toAdd, toRemove, toChange, isAccepted));
  lines.push(closingSymbolLine('}', schema, space, comma, toAdd, toRemove, toChange, isAccepted));

  return lines;
};

const objectPropertiesLines = (schema, space, toAdd, toRemove, toChange, isAccepted) => {
  if (!schema.properties) {
    return [];
  }
  const keys = Object.keys(schema.properties);

  return (
    keys.map((prop, index) => {
      let isReqProp = true;
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
  lines.push(getSingleLine(name, schema, isReq, space, toAdd, toRemove, toChange, isAccepted, comma));

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
  text += (name !== '') ? `"${name}":` : '';
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
