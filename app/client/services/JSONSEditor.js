import deepEqual from 'deep-equal';
import generateSchema from 'generate-schema';

let i = 0;

export function cleanJSONS(output) {
  const newOutput = Array.isArray(output) ? [].concat(output) : Object.assign({}, output);
  if (typeof newOutput === 'object') {
    Object.keys(newOutput).map((prop) => {
      if (typeof newOutput[prop] === 'object') {
        newOutput[prop] = cleanJSONS(newOutput[prop]);
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

      if (prop === 'toChange') {
        delete newOutput[prop];
      }

      if (prop === 'typeChanged') {
        delete newOutput[prop];
      }
      if (prop === 'newType') {
        delete newOutput[prop];
      }
      if (prop === 'toChangeRequired') {
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

export function acceptJSONS(output, index) {
  const newOutput = output;
  if (output.index && (output.index === index)) {
    newOutput.isAccepted = true;
  }

  if (typeof output === 'object') {
    Object.keys(output).map((prop) => {
      if (typeof output[prop] === 'object') {
        acceptJSONS(output[prop], index);
      }

      if (prop === 'index' && (newOutput[prop] === index)) {
        newOutput.isAccepted = true;
      }

      return null;
    });
  }

  if (output.toChangeRequired) {
    output.toChangeRequired.map((object) => {
      if (output.properties[object].toChange) {
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

export function rejectJSONS(output, index, base) {
  let newOutput = Array.isArray(output) ? [].concat(output) : Object.assign({}, output);
  if (output.index && (output.index === index)) {
    newOutput = Object.assign({}, base);
    newOutput.isAccepted = typeof newOutput.isAccepted !== 'undefined';
  }

  if (typeof output === 'object') {
    Object.keys(output).map((prop) => {
      if (typeof output[prop] === 'object') {
        newOutput[prop] = rejectJSONS(output[prop], index, (base ? base[prop] : {}));
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

export function compareJSONS(base, draft) {
  i = 0;
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
      output.type = base.type;
      output.newType = draft.type;
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

    output.toChangeRequired = new Array();

    // check required
    if (!deepEqual(draft.required, base.required)) {
      if (draft.required) {
        draft.required.map((reqField) => {
          if ((!base.required || base.required.indexOf(reqField) === -1)) {
            output.properties[reqField].toChange = true;
            output.properties[reqField].index = i;
            output.toChangeRequired.push(reqField);
            i += 1;
          }
          return null;
        });
      }

      if (base.required) {
        base.required.map((reqField) => {
          if ((output.properties[reqField] &&
            (!draft.required || draft.required.indexOf(reqField) === -1))) {
            output.properties[reqField].toChange = true;
            output.properties[reqField].index = i;
            output.toChangeRequired.push(reqField);
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

export function JSONtoJSONS(json) {
  try {
    const obj = JSON.parse(json);
    const schema = generateSchema.json(obj);

    return schema;
  } catch (e) {
    return null;
  }
}

export function JSONStoJSON(schema) {
  let JSONObject = [];
  JSONObject = getLines('', schema, false, 0);
  return JSONObject;
}

function getLines(name, schema, isReq, space, toAdd, typeChanged, toRemove, comma) {
  switch (schema.type) {
    /* eslint no-use-before-define: 0 */
    case 'object': return getObjectLine(name, schema, isReq, space, toAdd, typeChanged, toRemove, comma);
    case 'string': return getStringLine(name, schema, isReq, space, toAdd, typeChanged, toRemove, comma);
    case 'integer': return getIntegerLine(name, schema, isReq, space, toAdd, typeChanged, toRemove, comma);
    case 'number': return getNumberLine(name, schema, isReq, space, toAdd, typeChanged, toRemove, comma);
    case 'array': return getArrayLine(name, schema, isReq, space, toAdd, typeChanged, toRemove, comma);
    default: return [];
  }
}

const getObjectLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove, comma) => {
  let lines = [];
  const pre = ' '.repeat(space);

  let newLine = {
    line: `${pre}{`,
    toAdd: toAdd || schema.toAdd,
    toRemove: toRemove || schema.toRemove,
  };
  if (name !== '') {
    newLine = {
      isOpt: !isReq,
      isReq,
      toAdd: toAdd || schema.toAdd,
      toRemove: toRemove || schema.toRemove,
      typeChanged: typeChanged || schema.typeChanged,
      toChange: schema.toChange,
      addAction: schema.toAdd,
      removeAction: schema.toRemove,
      changeAction: schema.typeChanged || schema.toChange,
      isAccepted: schema.isAccepted,
      index: schema.index,
      type: 'object',
      line: `${pre}"${name}": {`,
    };
  }

  lines.push(newLine);
  const keys = Object.keys(schema.properties);

  const linesArray = keys.map((prop, index) => {
    let isReqProp = false;
    if (schema.required) {
      isReqProp = schema.required.indexOf(prop) > -1;
    }
    return getLines(prop, schema.properties[prop], isReqProp, space + 2,
      (toAdd || schema.toAdd), (typeChanged || schema.typeChanged),
      (toRemove || schema.toRemove), index !== keys.length - 1);
  });

  const merged = [].concat(...linesArray);

  lines = lines.concat(merged);

  lines.push({
    line: `${pre}}${comma ? ',' : ''}`,
    toAdd: toAdd || schema.toAdd,
    toRemove: toRemove || schema.toRemove,
  });

  return lines;
};

const getStringLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove, comma) => {
  const pre = ' '.repeat(space);
  return {
    isOpt: !isReq,
    isReq,
    toAdd: toAdd || schema.toAdd,
    toRemove: toRemove || schema.toRemove,
    typeChanged: typeChanged || schema.typeChanged,
    toChange: schema.toChange,
    type: 'string',
    addAction: schema.toAdd,
    removeAction: schema.toRemove,
    changeAction: schema.typeChanged || schema.toChange,
    index: schema.index,
    line: (name !== '') ? `${pre}"${name}": "${schema.default || 'LOREM IPSUM'}"${comma ? ',' : ''}` : `${pre}"${schema.default || 'LOREM IPSUM'}"${comma ? ',' : ''}`,
    isAccepted: schema.isAccepted,
  };
};

const getIntegerLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove, comma) => {
  const pre = ' '.repeat(space);
  return {
    isOpt: !isReq,
    isReq,
    toAdd: toAdd || schema.toAdd,
    toRemove: toRemove || schema.toRemove,
    typeChanged: typeChanged || schema.typeChanged,
    toChange: schema.toChange,
    type: 'integer',
    addAction: schema.toAdd,
    removeAction: schema.toRemove,
    changeAction: schema.typeChanged || schema.toChange,
    index: schema.index,
    line: (name !== '') ? `${pre}"${name}": ${schema.default || '7262325'}${comma ? ',' : ''}` : `${pre}${schema.default || '7262325'}${comma ? ',' : ''}`,
    isAccepted: schema.isAccepted,
  };
};

const getNumberLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove, comma) => {
  const pre = ' '.repeat(space);
  return {
    isOpt: !isReq,
    isReq,
    toAdd: toAdd || schema.toAdd,
    toRemove: toRemove || schema.toRemove,
    typeChanged: typeChanged || schema.typeChanged,
    toChange: schema.toChange,
    type: 'number',
    addAction: schema.toAdd,
    removeAction: schema.toRemove,
    changeAction: schema.typeChanged || schema.toChange,
    index: schema.index,
    line: (name !== '') ? `${pre}"${name}": 7262325` : `${pre}7262325${comma ? ',' : ''}`,
    isAccepted: schema.isAccepted,
  };
};

const getArrayLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove, comma) => {
  let lines = [];
  const pre = ' '.repeat(space);
  lines.push({
    isOpt: !isReq,
    isReq,
    type: 'array',
    typeChanged: typeChanged || schema.typeChanged,
    toRemove: toRemove || schema.toRemove,
    toChange: schema.toChange,
    toAdd: toAdd || schema.toAdd,
    addAction: schema.toAdd,
    removeAction: schema.toRemove,
    changeAction: schema.typeChanged || schema.toChange,
    index: schema.index,
    line: (name !== '') ? `${pre}"${name}": [` : `${pre}[`,
    isAccepted: schema.isAccepted,
  });

  const item1 = getLines('', schema.items, false, space + 2, (toAdd || schema.toAdd), (typeChanged || schema.typeChanged), (toRemove || schema.toRemove), true);
  const item2 = getLines('', schema.items, false, space + 2, (toAdd || schema.toAdd), (typeChanged || schema.typeChanged), (toRemove || schema.toRemove), false);

  lines = lines.concat(item1);
  lines = lines.concat(item2);

  lines.push({
    line: `${pre}]${comma ? ',' : ''}`,
    toAdd: toAdd || schema.toAdd,
    toRemove: toRemove || schema.toRemove,
  });

  return lines;
};
