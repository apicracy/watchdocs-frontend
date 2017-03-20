import deepEqual from 'deep-equal';

export function compareJSONS(base, draft) {
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
  const output = draft;

  if (base.type !== draft.type) {
    if (draft.type === 'object') {
      output.properties.toAdd = true;
    }
    if (draft.type === 'array') {
      output.items.toAdd = true;
    }
    output.typeChanged = true;
  }

  if (draft.type === 'object') {
    // check props
    Object.keys(draft.properties).map((prop) => {
      if (!deepEqual(draft.properties[prop], base.properties[prop])) {
        if (!base.properties[prop]) {
          output.properties[prop].toAdd = true;
        } else {
          output.properties[prop] = compareJSONS(base.properties[prop], draft.properties[prop]);
        }
      }

      return null;
    });

    Object.keys(base.properties).map((prop) => {
      if (!deepEqual(draft.properties[prop], base.properties[prop])) {
        if (!draft.properties[prop]) {
          output.properties[prop] = base.properties[prop];
          output.properties[prop].toRemove = true;
        } else {
          output.properties[prop] = compareJSONS(base.properties[prop], draft.properties[prop]);
        }
      }

      return null;
    });

    if (!deepEqual(draft.required, base.required)) {
      if (draft.required) {
        draft.required.map((reqField) => {
          if ((!base.required || base.required.indexOf(reqField) === -1)
            && output.properties[reqField].toAdd === false) {
            output.properties[reqField].toChange = true;
          }
          return null;
        });
      }

      if (base.required) {
        base.required.map((reqField) => {
          if ((output.properties[reqField] &&
            (!draft.required || draft.required.indexOf(reqField) === -1))
            && output.properties[reqField].toAdd === false) {
            output.properties[reqField].toChange = true;
          }
          return null;
        });
      }
    }
  }

  if (draft.type === 'array') {
    output.items = compareJSONS(base.items, draft.items);
  }

  return output;
}

export function JSONStoJSON(schema) {
  let JSONObject = [];
  if (schema && typeof schema === 'object') {
    JSONObject = getLines('', schema, false, 0);
  }
  return JSONObject;
}

function getLines(name, schema, isReq, space, toAdd, typeChanged, toRemove) {
  switch (schema.type) {
    /* eslint no-use-before-define: 0 */
    case 'object': return getObjectLine(name, schema, isReq, space, toAdd, typeChanged, toRemove);
    case 'string': return getStringLine(name, schema, isReq, space, toAdd, typeChanged, toRemove);
    case 'integer': return getIntegerLine(name, schema, isReq, space, toAdd, typeChanged, toRemove);
    case 'number': return getNumberLine(name, schema, isReq, space, toAdd, typeChanged, toRemove);
    case 'array': return getArrayLine(name, schema, isReq, space, toAdd, typeChanged, toRemove);
    default: return [];
  }
}

const getObjectLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove) => {
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
      type: 'object',
      line: `${pre}"${name}": {`,
    };
  }

  lines.push(newLine);

  const linesArray = Object.keys(schema.properties).map((prop) => {
    let isReqProp = false;
    if (schema.required) {
      isReqProp = schema.required.indexOf(prop) > -1;
    }
    return getLines(prop, schema.properties[prop], isReqProp, space + 2,
      (toAdd || schema.toAdd), (typeChanged || schema.typeChanged), (toRemove || schema.toRemove));
  });

  const merged = [].concat(...linesArray);

  lines = lines.concat(merged);

  lines.push({
    line: `${pre}}`,
    toAdd: toAdd || schema.toAdd,
    toRemove: toRemove || schema.toRemove,
  });

  return lines;
};

const getStringLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove) => {
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
    line: `${pre}"${name}": "LOREM IPSUM"`,
  };
};

const getIntegerLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove) => {
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
    line: `${pre}"${name}": 12353`,
  };
};

const getNumberLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove) => {
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
    line: `${pre}"${name}": 23`,
  };
};

const getArrayLine = (name, schema, isReq, space, toAdd, typeChanged, toRemove) => {
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
    line: `${pre}"${name}": [`,
  });
  console.log('schemaz', schema);
  console.log(lines);
  console.log('-----');
  console.log('toAdd', toAdd);
  console.log('schema.toAdd', schema.toAdd);
  console.log('-----');

  const item1 = getLines('', schema.items, false, space + 2, (toAdd || schema.toAdd), (typeChanged || schema.typeChanged), (toRemove || schema.toRemove));
  const item2 = getLines('', schema.items, false, space + 2, (toAdd || schema.toAdd), (typeChanged || schema.typeChanged), (toRemove || schema.toRemove));

  const merged = [].concat(...item1);
  lines = lines.concat(merged);
  const merged2 = [].concat(...item2);
  lines = lines.concat(merged2);

  lines.push({
    line: `${pre}]`,
    toAdd: toAdd || schema.toAdd,
    toRemove: toRemove || schema.toRemove,
  });

  return lines;
};
