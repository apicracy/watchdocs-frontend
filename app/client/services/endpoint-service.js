
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
    const conditions = [
      item.groupName && item.groupName.match(test),
      item.groupPath && item.groupPath.match(test),
    ];

    // Display only subfolders that match the name
    const filteredChildren = item.endpoints ? filterByName(item.endpoints, search) : [];

    // Get original folder endpoints
    const childEndpoints = item.endpoints ? item.endpoints.filter(end => !!end.method) : [];

    // Get original folder child folders
    const childGroups = item.endpoints ? item.endpoints.filter(child => !!child.endpoints) : [];

    // If have matches
    if (conditions.some(e => e)) {
      const matched = {
        ...item,
        endpoints: [...childEndpoints, ...filteredChildren],
        isOpen: true,
      };

      return [...state, matched];
    }

    // if it has children check for matched elements inside leaving only folder icon
    if (item.endpoints) {
      if (childGroups.length > 0) {
        const group = {
          ...item,
          isOpen: true,
          endpoints: filteredChildren,
        };

        if (group.endpoints.length > 0) {
          return [...state, group];
        }
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
