const generateId = () => Math.floor(Math.random() * 10000);

//  Mock
export const INITIAL_STATE = [
  {
    id: generateId(),
    groupName: 'Projects',
    groupPath: '/projects',
    endpoints: [
      { method: 'GET', params: [], id: generateId(), status: 'valid' }, // get all
      { method: 'GET', params: ['project_id'], id: generateId(), status: 'valid' }, // get one
    ],
  },
  {
    id: generateId(),
    groupName: 'Endpoints',
    groupPath: '/endpoints',
    endpoints: [
      { method: 'GET', params: [], id: generateId(), status: 'valid' }, // get all
      { method: 'GET', params: ['endpoint_id'], id: generateId(), status: 'invalid' }, // get one
      {
        id: generateId(),
        groupName: 'Inavtive',
        groupPath: '/incative',
        endpoints: [
          { method: 'GET', params: [], id: generateId(), status: 'invalid' }, // get all
          { method: 'GET', params: ['endpoint_id'], id: generateId(), status: 'valid' }, // get one
          {
            id: generateId(),
            groupName: 'Deleted',
            groupPath: '/deleted',
            endpoints: [
              { method: 'GET', params: [], id: generateId(), status: 'valid' }, // get all
              { method: 'GET', params: ['endpoint_id'], id: generateId(), status: 'valid' }, // get one
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
      { method: 'GET', params: [], id: generateId(), status: 'valid' },
      { method: 'POST', params: [], id: generateId(), status: 'invalid' },
      { method: 'GET', params: ['user_id'], id: generateId(), status: 'invalid' },
      { method: 'DELETE', params: ['user_id'], id: generateId(), status: 'invalid' },
      { method: 'PUT', params: ['user_id'], id: generateId(), status: 'valid' },
      {
        id: generateId(),
        groupName: 'Administrators',
        groupPath: '/administrators',
        endpoints: [
          { method: 'GET', params: [], id: generateId(), status: 'valid' },
          { method: 'POST', params: [], id: generateId(), status: 'invalid' },
          { method: 'DELETE', params: [], id: generateId(), status: 'valid' },
          { method: 'PATCH', params: [], id: generateId(), status: 'valid' },
          {
            id: generateId(),
            groupName: 'ProjectOwners',
            groupPath: '/owners',
            endpoints: [
              { method: 'GET', params: [], id: generateId(), status: 'valid' },
              { method: 'POST', params: [], id: generateId(), status: 'invalid' },
              { method: 'DELETE', params: [], id: generateId(), status: 'valid' },
              { method: 'PATCH', params: [], id: generateId(), status: 'valid' },
            ],
          },
        ],
      },
      {
        id: generateId(),
        groupName: 'Inactive',
        groupPath: '/inavtive',
        endpoints: [
          { method: 'GET', params: [], id: generateId(), status: 'invalid' },
        ],
      },
    ],
  },
  {
    id: generateId(),
    groupName: 'Products',
    groupPath: '/products',
    endpoints: [
      { method: 'GET', params: [], id: generateId(), status: 'valid' },
      { method: 'POST', params: [], id: generateId(), status: 'valid' },
      { method: 'GET', params: ['product_id'], id: generateId(), status: 'invalid' },
      { method: 'DELETE', params: ['product_id'], id: generateId(), status: 'invalid' },
      { method: 'PUT', params: ['product_id'], id: generateId(), status: 'invalid' },
    ],
  },
  {
    id: generateId(),
    groupName: 'Articles',
    groupPath: '/articles',
    endpoints: [
      { method: 'GET', params: [], id: generateId(), status: 'invalid' },
      { method: 'POST', params: [], id: generateId(), status: 'invalid' },
      { method: 'GET', params: ['article_id'], id: generateId(), status: 'invalid' },
      { method: 'DELETE', params: ['article_id'], id: generateId(), status: 'invalid' },
      { method: 'PUT', params: ['article_id'], id: generateId(), status: 'valid' },
    ],
  },
  {
    id: generateId(),
    groupName: 'Documents',
    groupPath: '/documents',
    endpoints: [
      { method: 'GET', params: [], id: generateId(), status: 'valid' },
      { method: 'POST', params: [], id: generateId(), status: 'invalid' },
      { method: 'GET', params: ['document_id'], id: generateId(), status: 'invalid' },
      { method: 'DELETE', params: ['document_id'], id: generateId(), status: 'invalid' },
      { method: 'PUT', params: ['document_id'], id: generateId(), status: 'valid' },
    ],
  },
  {
    id: generateId(),
    groupName: 'Models',
    groupPath: '/models',
    endpoints: [
      { method: 'GET', params: [], id: generateId(), status: 'invalid' }, // get all
      { method: 'POST', params: [], id: generateId(), status: 'invalid' },
      { method: 'GET', params: ['model_id'], id: generateId(), status: 'invalid' },
      { method: 'DELETE', params: ['model_id'], id: generateId(), status: 'valid' },
      { method: 'PUT', params: ['model_id'], id: generateId(), status: 'valid' },
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
