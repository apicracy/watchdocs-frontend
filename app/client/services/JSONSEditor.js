export function JSONtoJSONS() {
  // console.log(JSONLines);
  return {};
}

export function JSONStoJSON(schema) {
  let JSONObject = [];
  if (schema && typeof schema === 'object') {
    JSONObject = getLines('', schema, false, 0);
  }
  return JSONObject;
}

function getLines(name, schema, isReq, space) {
  switch (schema.type) {
    /* eslint no-use-before-define: 0 */
    case 'object': return getObjectLine(name, schema, isReq, space);
    case 'string': return getStringLine(name, schema, isReq, space);
    case 'integer': return getIntegerLine(name, schema, isReq, space);
    case 'array': return getArrayLine(name, schema, isReq, space);
    default: return [];
  }
}

const getObjectLine = (name, schema, isReq, space) => {
  let lines = [];
  const pre = ' '.repeat(space);

  let newLine = {
    line: `${pre}{`,
  };
  if (name !== '') {
    newLine = {
      isOpt: !isReq,
      isReq,
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
    return getLines(prop, schema.properties[prop], isReqProp, space + 2);
  });

  const merged = [].concat(...linesArray);

  lines = lines.concat(merged);

  lines.push({
    line: `${pre}}`,
  });

  return lines;
};

const getStringLine = (name, schema, isReq, space) => {
  const pre = ' '.repeat(space);
  return {
    isOpt: !isReq,
    isReq,
    type: 'string',
    line: `${pre}"${name}": "LOREM IPSUM"`,
  };
};

const getIntegerLine = (name, schema, isReq, space) => {
  const pre = ' '.repeat(space);
  return {
    isOpt: !isReq,
    isReq,
    type: 'integer',
    line: `${pre}"${name}": 12353`,
  };
};

const getArrayLine = (name, schema, isReq, space) => {
  let lines = [];
  const pre = ' '.repeat(space);
  lines.push({
    isOpt: !isReq,
    isReq,
    type: 'array',
    line: `${pre}"${name}": [`,
  });

  const item1 = getLines('', schema.items, false, space + 2);
  const item2 = getLines('', schema.items, false, space + 2);

  const merged = [].concat(...item1);
  lines = lines.concat(merged);
  const merged2 = [].concat(...item2);
  lines = lines.concat(merged2);

  lines.push({
    line: `${pre}]`,
  });

  return lines;
};
