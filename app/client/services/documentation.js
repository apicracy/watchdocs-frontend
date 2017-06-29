import parseJsonSchema from './json-schema-parser';
import http from 'services/http';
import { fetchDocumentation as fetchDoc, fetchRequest } from 'actions/documentation';
import { setTitles } from 'actions/appLayout';

export function fetchDocumentation(projectId) {
  return (dispatch) => {
    dispatch(fetchRequest());
    http(`/api/v1/projects/${projectId}/documentation`)
      .then(response => response.json())
      .then(response => {
        dispatch(setTitles(response.name, 'Living API documentation'));
        return buildDocumentation(response.documentation);
      })
      .then(response => {
        return dispatch(fetchDoc(response));
      });
  };
}

// hopefully TODO on backend
export function buildDocumentation(endpointList, parentGroup = '') {
  return endpointList.reduce((state, item) => {
    const parent = parentGroup ? `${parentGroup} ` : '';

    switch (item.type) {
      case 'Group':
        return [
          ...state,
          {
            ...item,
            section: buildSectionId(`${parent}${item.name}`),
            items: buildDocumentation(item.items),
          },
        ];

      case 'Endpoint':
        return [...state, createEndpoint(item, parentGroup)];

      case 'Document':
        return [
          ...state,
          {
            ...item,
            section: buildSectionId(`${parent}${item.name}`),
          },
        ];

      default:
        return state;
    }
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
  const group = parentGroup !== '' ? `${parentGroup}-` : '';
  const section = (item.description && item.description.title) ? (
    buildSectionId(`${group}${item.description.title}`)
  ) : buildSectionId(`${group}${item.method}${item.url}`);

  return {
    ...item,
    section,
    title: (item.description && item.description.title) ?
      item.description.title : `[${item.method}]: ${item.url}`,
    exampleResponse: item.responses && item.responses.length > 0 ?
      parseJsonSchema(item.responses[0].body) : null,
    exampleRequest: item.request ? parseJsonSchema(item.request.body) : null,
  };
}
