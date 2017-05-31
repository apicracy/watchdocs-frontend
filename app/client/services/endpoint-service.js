
export const filterEndpoints = (endpoints, options) => {
  const { search, status } = options;
  const escaped = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

  const byStatus = [
    status === 'outdated',
  ];

  const byName = [
    search,
    search.length > 0,
  ];

  // First filter by status
  const filtered = byStatus.some(e => e) ? filterByStatus(endpoints, status) : endpoints;
  // Then by name
  return byName.every(e => e) ? filterByName(filtered, escaped) : filtered;
};

function filterByName(endpoints, search) {
  return endpoints.reduce((state, item) => {
    const test = new RegExp(search, 'i');

    if (item.type === 'Document' && item.name.match(test)) {
      return [...state, { ...item }];
    } else if (item.type === 'Endpoint' && item.url.match(test)) {
      return [...state, { ...item }];
    } else if (item.items) {
      const filtered = filterByName(item.items, search);
      if (item.name.match(test) || filtered.length > 0) {
        return [...state, { ...item, isOpen: true, items: filtered }];
      }
    }

    return state;
  }, []);
}

function filterByStatus(endpoints, status) {
  return endpoints.reduce((state, item) => {
    const endConditions = [
      item.status,
      item.status === status,
    ];

    if (endConditions.every(e => e)) {
      return [...state, item];
    }

    if (item.items) {
      const matched = {
        ...item,
        items: filterByStatus(item.items, status),
      };

      if (matched.items.length > 0) {
        return [...state, matched];
      }
    }

    return state;
  }, []);
}

export const filterById = (endpoints, id, parentId = null, fullPath = '') => endpoints.reduce((state, item) => {
  const path = item.groupPath ? fullPath + item.groupPath : fullPath;

  if (item.id === id) {
    return { ...item, parentId, fullPath: path };
  } else if (item.items) {
    const subGroups = filterById(item.items, id, item.id, path);
    return subGroups ? { ...subGroups, parentId: item.id } : state;
  }

  return state;
}, null);

export const filterByIdAndType = (endpoints, id, type, parentId = null, fullPath = '') => endpoints.reduce((state, item) => {
  const path = item.groupPath ? fullPath + item.groupPath : fullPath;

  if (item.id === id && item.type === type) {
    return { ...item, parentId, fullPath: path };
  } else if (item.items) {
    const subGroups = filterByIdAndType(item.items, id, type, item.id, fullPath);
    return subGroups ? { ...subGroups, parentId: item.id } : state;
  }

  return state;
}, null);
