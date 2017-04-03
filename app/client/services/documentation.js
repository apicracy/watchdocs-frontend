// hopefully TODO on backend
export function buildDocumentation(endpointList, currentPath = '') {
  return endpointList.reduce((state, item) => {
    let doc;

    if (item.groupName) {
      doc = {
        type: 'folder',
        section: item.groupName,
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

function createEndpoint(item, path) {
  const params = item.params;
  const mainParam = params.find(x => x.main);
  const endpointPath = mainParam ? `${path}/${mainParam.example || 1}` : path;
  return {
    type: 'endpoint',
    section: (item.description && item.description.title) ? item.description.title : item.method,
    title: (item.description && item.description.title) ? item.description.title : item.method,
    description: (item.description && item.description.content) ? item.description.content : '',
    method: item.method,
    path: endpointPath,
    urlParams: params,
  };
}
