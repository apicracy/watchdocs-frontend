// hopefully TODO on backend
export function buildDocumentation(endpointList) {
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
        doc.children = buildDocumentation(item.endpoints);
      }
    } else if (item.method) {
      doc = {
        type: 'endpoint',
        section: (item.description && item.description.title) ? item.description.title : item.method,
        title: (item.description && item.description.title) ? item.description.title : item.method,
        description: (item.description && item.description.content) ? item.description.content : '',
      }
    } else {
      doc = null;
    }

    return [...state, doc];
  }, []);
}
