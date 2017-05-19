import deepEqual from 'deep-equal';
import generateSchema from 'generate-schema';

export function cleanJSONSchema(output) {
  const newOutput = Array.isArray(output) ? [].concat(output) : Object.assign({}, output);
  if (typeof newOutput === 'object') {
    Object.keys(newOutput).map((prop) => {
      if (typeof newOutput[prop] === 'object') {
        newOutput[prop] = cleanJSONSchema(newOutput[prop]);
      }
      if (newOutput[prop] === null) {
        delete newOutput[prop];
      }

      if (prop === 'index') {
        delete newOutput[prop];
      }

      if (prop === 'toRemove') {
        delete newOutput[prop];
      }

      if (prop === 'toAdd') {
        delete newOutput[prop];
      }

      if (prop === 'isAccepted') {
        delete newOutput[prop];
      }

      if (prop === 'requiredChanged') {
        delete newOutput[prop];
      }

      if (prop === 'typeChanged') {
        delete newOutput[prop];
      }
      if (prop === 'newType') {
        delete newOutput[prop];
      }
      if (prop === 'onChangeRequired') {
        delete newOutput[prop];
      }

      return null;
    });
  }

  if (output && output.toAdd) {
    if (!output.isAccepted) {
      return null;
    }
  }

  if (output && output.toRemove) {
    if (output.isAccepted) {
      return null;
    }
  }

  if (output && !output.toRemove && output.isAccepted === false) {
    return null;
  }

  return newOutput;
}

export function acceptJSONSchema(output, index) {
  const newOutput = output;
  if (output.index && (output.index === index)) {
    newOutput.isAccepted = true;
  }

  if (typeof output === 'object') {
    Object.keys(output).map((prop) => {
      if (typeof output[prop] === 'object') {
        acceptJSONSchema(output[prop], index);
      }

      if (prop === 'index' && (newOutput[prop] === index)) {
        newOutput.isAccepted = true;
      }

      return null;
    });
  }

  if (output.onChangeRequired) {
    output.onChangeRequired.map((object) => {
      if (output.properties[object].requiredChanged) {
        const indexOfObject = output.required.indexOf(object);
        if (indexOfObject === -1) {
          output.required.push(object);
        } else {
          output.required.splice(indexOfObject, 1);
        }
      }
      return null;
    });
  }

  if (newOutput.newType) {
    if (newOutput.isAccepted) {
      newOutput.type = newOutput.newType;
    }
  }

  return newOutput;
}

export function rejectJSONSchema(output, index, base) {
  let newOutput = Array.isArray(output) ? [].concat(output) : Object.assign({}, output);
  if (output.index && (output.index === index)) {
    newOutput = Object.assign({}, base);
    newOutput.isAccepted = typeof newOutput.isAccepted !== 'undefined';
  }

  if (typeof output === 'object') {
    Object.keys(output).map((prop) => {
      if (typeof output[prop] === 'object') {
        newOutput[prop] = rejectJSONSchema(output[prop], index, (base ? base[prop] : {}));
      }

      if (prop === 'index' && (newOutput[prop] === index)) {
        newOutput = Object.assign({}, base);
        newOutput.isAccepted = typeof newOutput.isAccepted !== 'undefined';
      }

      return null;
    });
  }
  // console.log(newOutput)
  return newOutput;
}

export function compareJSONSchema(base, draft) {
  const output = compare(base, draft);
  return output;
}

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
  let i = 0;

  if (base.type !== draft.type) {
    if (draft.type === 'object') {
      output.properties.toAdd = true;
      output.properties.index = i;
      i += 1;
    } else if (draft.type === 'array') {
      output.items.toAdd = true;
      output.items.index = i;
      i += 1;
    } else {
      output.type = draft.type;
      output.oldSchema = base;
      output.typeChanged = true;
      output.index = i;
      i += 1;
    }
  }

  if (draft.type === 'object') {
    // check props
    Object.keys(draft.properties).map((prop) => {
      if (!deepEqual(draft.properties[prop], base.properties[prop])) {
        if (!base.properties[prop]) {
          output.properties[prop].toAdd = true;
          output.properties[prop].index = i;
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
          output.properties[prop].index = i;
          i += 1;
        } else {
          output.properties[prop] = compare(base.properties[prop], draft.properties[prop]);
        }
      }

      return null;
    });

    /* eslint no-array-constructor: 0 */
    if (base.required) {
      output.required = [].concat(base.required);
    }

    output.onChangeRequired = new Array();

    // check required
    if (!deepEqual(draft.required, base.required)) {
      if (draft.required) {
        draft.required.map((reqField) => {
          if (((!base.required || base.required.indexOf(reqField) === -1) &&
            !output.properties[reqField].toAdd)) {
            output.properties[reqField].requiredChanged = true;
            output.properties[reqField].index = i;
            output.onChangeRequired.push(reqField);
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
            output.properties[reqField].index = i;
            output.onChangeRequired.push(reqField);
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

function getLines(name, schema, isReq, space, toAdd, toRemove, toChange, comma) {
  const lineToChange = toChange || schema.typeChanged || schema.requiredChanged;
  // line could be marked to remove/add by itself (from schema) or by parent
  const lineToAdd = toAdd || schema.toAdd || (lineToChange && !toRemove);
  const lineToRemove = toRemove || schema.toRemove;

  let lines;
  switch (schema.type) {
    /* eslint no-use-before-define: 0 */
    case 'object': lines = getObjectLine(name, schema, isReq, space, lineToAdd, lineToRemove, lineToChange, comma); break;
    case 'array': lines = getArrayLine(name, schema, isReq, space, lineToAdd, lineToRemove, lineToChange, comma); break;
    default: lines = getSingleLine(name, schema, isReq, space, lineToAdd, lineToRemove, lineToChange, comma);
  }
  lines = [].concat(lines);

  // when line changed place old version before the new one
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
    return getLines(name, schema.oldSchema, isReq, space, false, true, true, true, comma);
  }
  if (schema.requiredChanged) {
    const oldSchema = Object.assign({}, schema);
    oldSchema.requiredChanged = false;
    return getLines(name, oldSchema, !isReq, space, false, true, true, true, comma)[0];
  }
  // TODO: Handle case when both type and required has changed
  return [];
};

const getObjectLine = (name, schema, isReq, space, toAdd, toRemove, toChange, comma) => {
  let lines = [];
  lines.push(getSingleLine(name, schema, isReq, space, toAdd, toRemove, toChange, comma));

  if (schema.requiredChanged && !schema.typeChanged) {
    // prevent items to be marked to add if only required changed
    // Warning: HACK. To be refactored
    toAdd = false;
    toChange = false;
  }
  lines = lines.concat(...objectPropertiesLines(schema, space, toAdd, toRemove, toChange));
  lines.push(closingSymbolLine('}', schema, space, comma, toAdd, toRemove, toChange));

  return lines;
};

const objectPropertiesLines = (schema, space, toAdd, toRemove, toChange) => {
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
        toChange, index !== keys.length - 1);
    })
  );
};


const getArrayLine = (name, schema, isReq, space, toAdd, toRemove, toChange, comma) => {
  let lines = [];
  lines.push(getSingleLine(name, schema, isReq, space, toAdd, toRemove, comma));

  if (schema.requiredChanged && !schema.typeChanged) {
    // prevent items to be marked to add if only required changed
    // Warning: HACK. To be refactored
    toAdd = false;
    toChange = false;
  }

  const arrayItemsLines = getLines('', schema.items, null, space + 2,
    toAdd, toRemove, toChange, false);
  lines = lines.concat(arrayItemsLines);

  lines.push(closingSymbolLine(']', schema, space, comma, toAdd, toRemove, toChange));

  return lines;
};


const getSingleLine = (name, schema, isReq, space, toAdd, toRemove, toChange, comma) => (
  {
    id: Math.random(),
    isOpt: !isReq,
    isReq,
    toAdd,
    toRemove,
    toChange,
    index: schema.index,
    type: schema.type,
    line: textLine(name, schema, space, comma),
    isAccepted: schema.isAccepted,
  }
);

const closingSymbolLine = (symbol, schema, space, comma, toAdd, toRemove, toChange) => {
  const id = Math.random();
  const pre = ' '.repeat(space);
  const line = `${pre}${symbol}${comma ? ',' : ''}`;
  return { id, line, toAdd, toRemove, toChange };
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
