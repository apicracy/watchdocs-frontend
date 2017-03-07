const generateId = () => Math.floor(Math.random() * 10000);

//  Mock
export const INITIAL_STATE = [
  {
    id: generateId(),
    groupName: 'Projects',
    groupPath: '/projects',
    endpoints: [
      { method: 'GET', params: [], id: generateId() }, // get all
      { method: 'GET', params: ['project_id'], id: generateId() }, // get one
    ],
  },
  {
    id: generateId(),
    groupName: 'Endpoints',
    groupPath: '/endpoints',
    endpoints: [
      { method: 'GET', params: [], id: generateId() }, // get all
      { method: 'GET', params: ['endpoint_id'], id: generateId() }, // get one
      {
        id: generateId(),
        groupName: 'Inavtive',
        groupPath: '/incative',
        endpoints: [
          { method: 'GET', params: [], id: generateId() }, // get all
          { method: 'GET', params: ['endpoint_id'], id: generateId() }, // get one
          {
            id: generateId(),
            groupName: 'Deleted',
            groupPath: '/deleted',
            endpoints: [
              { method: 'GET', params: [], id: generateId() }, // get all
              { method: 'GET', params: ['endpoint_id'], id: generateId() }, // get one
            ],
          },
        ],
      },
    ],
  },
  {
    id: generateId(),
    groupName: 'Users',
    groupPath: '/users',
    endpoints: [
      { method: 'GET', params: [], id: generateId() },
      { method: 'POST', params: [], id: generateId() },
      { method: 'GET', params: ['user_id'], id: generateId() },
      { method: 'DELETE', params: ['user_id'], id: generateId() },
      { method: 'PUT', params: ['user_id'], id: generateId() },
      {
        id: generateId(),
        groupName: 'Administrators',
        groupPath: '/administrators',
        endpoints: [
          { method: 'GET', params: [], id: generateId() },
          { method: 'POST', params: [], id: generateId() },
          { method: 'DELETE', params: [], id: generateId() },
          { method: 'PATCH', params: [], id: generateId() },
          {
            id: generateId(),
            groupName: 'ProjectOwners',
            groupPath: '/owners',
            endpoints: [
              { method: 'GET', params: [], id: generateId() },
              { method: 'POST', params: [], id: generateId() },
              { method: 'DELETE', params: [], id: generateId() },
              { method: 'PATCH', params: [], id: generateId() },
            ],
          },
        ],
      },
      {
        id: generateId(),
        groupName: 'Inactive',
        groupPath: '/inavtive',
        endpoints: [
          { method: 'GET', params: [], id: generateId() },
        ],
      },
    ],
  },
  {
    id: generateId(),
    groupName: 'Products',
    groupPath: '/products',
    endpoints: [
      { method: 'GET', params: [], id: generateId() },
      { method: 'POST', params: [], id: generateId() },
      { method: 'GET', params: ['product_id'], id: generateId() },
      { method: 'DELETE', params: ['product_id'], id: generateId() },
      { method: 'PUT', params: ['product_id'], id: generateId() },
    ],
  },
  {
    id: generateId(),
    groupName: 'Articles',
    groupPath: '/articles',
    endpoints: [
      { method: 'GET', params: [], id: generateId() },
      { method: 'POST', params: [], id: generateId() },
      { method: 'GET', params: ['article_id'], id: generateId() },
      { method: 'DELETE', params: ['article_id'], id: generateId() },
      { method: 'PUT', params: ['article_id'], id: generateId() },
    ],
  },
  {
    id: generateId(),
    groupName: 'Documents',
    groupPath: '/documents',
    endpoints: [
      { method: 'GET', params: [], id: generateId() },
      { method: 'POST', params: [], id: generateId() },
      { method: 'GET', params: ['document_id'], id: generateId() },
      { method: 'DELETE', params: ['document_id'], id: generateId() },
      { method: 'PUT', params: ['document_id'], id: generateId() },
    ],
  },
  {
    id: generateId(),
    groupName: 'Models',
    groupPath: '/models',
    endpoints: [
      { method: 'GET', params: [], id: generateId() }, // get all
      { method: 'POST', params: [], id: generateId() },
      { method: 'GET', params: ['model_id'], id: generateId() },
      { method: 'DELETE', params: ['model_id'], id: generateId() },
      { method: 'PUT', params: ['model_id'], id: generateId() },
    ],
  },
];

const LOAD_ENDPOINTS = 'test';

export function endpoints(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ENDPOINTS: return loadEndpoints(state, payload);
    default: return state;
  }
}

function loadEndpoints(state, payload) {
  // TODO load from payload
  return { ...state, ...payload };
}
