const mockStrings = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

const generateValue = (obj) => {
  const type = obj.type;

  switch (type) {
    case 'number':
      return Math.floor(Math.random() * 10000) + 1;

    case 'array':
    case 'object':
      return generateResponse(obj);

    case 'null':
      return null;

    case 'boolean':
      return Math.random() >= 0.5;

    default:
      return mockStrings[Math.floor(Math.random() * mockStrings.length)];
  }
};

const buildObject = (schema) => {
  if (!schema || !schema.properties) return {};

  return Object.keys(schema.properties).map((x) => {
    const property = schema.properties[x];
    return Object.assign({}, property, {
      key: x,
      value: generateValue(property),
    });
  }).reduce((final, current) => (
    Object.assign({}, final, { [current.key]: current.value })
  ), {});
};

function generateResponse(schema) {
  if (!schema) return '';

  if (schema.type === 'object') {
    return buildObject(schema);
  } else if (schema.type === 'array') {
    return [
      buildObject(schema.items),
    ];
  }

  // gently fail
  return '';
}

export default generateResponse;
