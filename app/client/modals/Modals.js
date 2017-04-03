
import React from 'react';

import AddNewModal from 'modals/AddNewModal/AddNewModal';

/* Endpoint Documentation view modals */
import AddUrlParam from 'modals/AddUrlParam/AddUrlParam';
import EditEndpointDescription from 'modals/EditEndpointDescription/EditEndpointDescription';
import AddResponseParam from 'modals/AddResponseParam/AddResponseParam';
import AddRequestParam from 'modals/AddRequestParam/AddRequestParam';

export default () => (
  <div>
    <AddNewModal />
    <AddUrlParam />
    <EditEndpointDescription />
    <AddResponseParam />
    <AddRequestParam />
  </div>
);
