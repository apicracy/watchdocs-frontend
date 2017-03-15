export function JSONStoJSON(schema) {
  let JSONObject = [];
  if (schema && typeof schema === 'object') {
    JSONObject = getLines('', schema);
  }
  return JSONObject;
}

function getLines(name, schema, isReq) {
  switch (schema.type) {
    /* eslint no-use-before-define: 0 */
    case 'object': return getObjectLine(name, schema, isReq);
    case 'string': return getStringLine(name, schema, isReq);
    case 'integer': return getIntegerLine(name, schema, isReq);
    case 'array': return getArrayLine(name, schema, isReq);
    default: return [];
  }
}

const getObjectLine = (name, schema, isReq) => {
  let lines = [];
  let newLine = {
    line: '{',
  };
  if (name !== '') {
    newLine = {
      isOpt: !isReq,
      isReq,
      line: ` "${name}": {`,
    };
  }

  lines.push(newLine);

  const linesArray = Object.keys(schema.properties).map((prop) => {
    let isReqProp = false;
    if (schema.required) {
      isReqProp = schema.required.indexOf(prop) > -1;
    }
    return getLines(prop, schema.properties[prop], isReqProp);
  });

  const merged = [].concat(...linesArray);

  lines = lines.concat(merged);

  lines.push({
    line: '}',
  });

  return lines;
};

const getStringLine = (name, schema, isReq) => ({
  isOpt: !isReq,
  isReq,
  line: `"${name}": "LOREM IPSUM"`,
});

const getIntegerLine = (name, schema, isReq) => ({
  isOpt: !isReq,
  isReq,
  line: `"${name}": "12345"`,
});

const getArrayLine = (name, schema, isReq) => {
  let lines = [];
  lines.push({
    isOpt: !isReq,
    isReq,
    line: `"${name}": [`,
  });

  const item1 = getLines('', schema.items);
  const item2 = getLines('', schema.items);

  const merged = [].concat(...item1);
  lines = lines.concat(merged);
  const merged2 = [].concat(...item2);
  lines = lines.concat(merged2);

  lines.push({
    line: ']',
  });

  return lines;
};
