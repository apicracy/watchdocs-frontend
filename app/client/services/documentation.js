import jsf from 'json-schema-faker';

// hopefully TODO on backend
export function buildDocumentation(endpointList, currentPath = '') {
  return endpointList.reduce((state, item) => {
    let doc;

    if (item.groupName) {
      doc = {
        type: 'folder',
        section: buildSectionId(`${currentPath}-${item.groupName}`),
        title: item.groupName,
        description: item.description,
        children: [],
      };

      if (item.endpoints) {
        doc.children = buildDocumentation(item.endpoints, item.groupPath);
      }
    } else if (item.method) {
      doc = createEndpoint(item, currentPath);
    } else {
      doc = null;
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

function createEndpoint(item, path) {
  const params = item.params;
  const mainParam = params.find(x => x.main);
  const endpointPath = mainParam ? `${path}/${mainParam.example || 1}` : path;

  const section = (item.description && item.description.title) ? (
    buildSectionId(`${path}-${item.description.title}`)
  ) : buildSectionId(`${path}-${item.method}`);

  return {
    type: 'endpoint',
    section: section,
    title: (item.description && item.description.title) ? item.description.title : item.method,
    description: (item.description && item.description.content) ? item.description.content : '',
    method: item.method,
    path: endpointPath,
    urlParams: params,
    queryParams: item.requests ? item.requests[0].base : null,
    headers: item.requests ? item.requests[0].headers : [],
    exampleResponse: item.responses ? generateResponse(item.responses[0].base) : null,
  };
}

function generateResponse(schema) {
  schema.required = Object.keys(schema.properties);
  return jsf(schema);
}
