
export const filterEndpoints = (endpoints, options) => {
  const { search } = options;

  if (search && search.length > 0) {
    return endpoints.reduce((state, item) => {
      const test = new RegExp(search, 'i');

      // If name matches
      if (item.groupName && item.groupName.match(test)) {
        // Display only subfolders that match the name
        const childItems = filterEndpoints(item.endpoints, options);

        // If folder's matched, always display it's endpoints
        const childEndpoints = item.endpoints.filter(end => !!end.method);

        const openedItem = {
          ...item,
          endpoints: [...childEndpoints, ...childItems],
          isOpen: true,
        };

        return [...state, openedItem];
      }

      // if it has children check for matched elements leaving only folder icon
      if (item.endpoints) {
        const childGroups = item.endpoints.filter(child => !!child.endpoints);

        if (childGroups.length > 0) {
          const group = {
            ...item,
            isOpen: true,
            endpoints: filterEndpoints(item.endpoints, options),
          };

          if (group.endpoints.length > 0) {
            return [...state, group];
          }
        }
      }

      return state;
    }, []);
  }

  return endpoints;
};
