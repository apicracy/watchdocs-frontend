import parseJsonSchema from './json-schema-parser';

// hopefully TODO on backend
export function buildDocumentation(endpointList, parentGroup = '') {
  return endpointList.reduce((state, item) => {
    let doc;

    if (item.groupName) {
      doc = {
        type: 'folder',
        section: buildSectionId(`${item.groupName}`),
        title: item.groupName,
        description: item.description,
        children: [],
      };

      if (item.endpoints) {
        doc.children = buildDocumentation(item.endpoints, `${parentGroup}-${item.groupName}`);
      }
    } else if (item.method) {
      doc = createEndpoint(item, parentGroup);
    } else {
      return state;
    }

    return [...state, doc];
  }, []);
}

function buildSectionId(string) {
  return string
    .replace(/\s/g, '-')
    .replace(/\//g, '-')
    .replace(/^-/, '')
    .toLowerCase();
}

function createEndpoint(item, parentGroup) {
  const params = item.params;

  const section = (item.description && item.description.title) ? (
    buildSectionId(`${parentGroup}-${item.description.title}`)
  ) : buildSectionId(`${parentGroup}-${item.method}`);

  return {
    type: 'endpoint',
    section,
    title: (item.description && item.description.title) ? item.description.title : item.method,
    description: (item.description && item.description.content) ? item.description.content : '',
    method: item.method,
    url: item.url,
    urlParams: params,
    queryParams: item.request ? item.request.base : null,
    headers: item.request ? item.request.headers : [],
    exampleResponse: item.responses ? parseJsonSchema(item.responses[0].base) : null,
  };
}
