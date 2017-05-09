const generateValue = (obj) => {
  if (!obj) return '';
  const type = obj.type;

  switch (type) {
    case 'object':
      /* eslint no-use-before-define:0 */
      return buildObject(obj);

    case 'array':
      return [generateValue(obj.items)];

    case 'number':
      return Math.floor(Math.random() * 10000) + 1;

    case 'null':
      return null;

    case 'boolean':
      return Math.random() >= 0.5;

    case 'string':
      return 'Lorem ipsum';

    case undefined:
      return null;

    default:
      return `not supported: ${type}`;
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

  return generateValue(schema);
}

export default generateResponse;
