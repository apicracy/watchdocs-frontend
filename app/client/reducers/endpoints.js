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
          {
            id: generateId(),
            groupName: 'Another nested group',
            groupPath: '/nested',
            endpoints: [
              { method: 'GET', params: [], id: generateId() },
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
