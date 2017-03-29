
import React from 'react';

import AddNewModal from 'modals/AddNewModal/AddNewModal';

/* Endpoint Documentation view modals */
import AddUrlParam from 'modals/AddUrlParam/AddUrlParam';
import EditEndpointDescription from 'modals/EditEndpointDescription/EditEndpointDescription';

export default () => (
  <div>
    <AddNewModal />
    <AddUrlParam />
    <EditEndpointDescription />
  </div>
);
