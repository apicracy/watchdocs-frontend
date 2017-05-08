
import React from 'react';

import AddEndpointModal from 'modals/AddEndpointModal/AddEndpointModal';

/* Endpoint Documentation view modals */
import AddUrlParam from 'modals/AddUrlParam/AddUrlParam';
import EditEndpointDescription from 'modals/EditEndpointDescription/EditEndpointDescription';
import AddResponseParam from 'modals/AddResponseParam/AddResponseParam';
import AddRequestParam from 'modals/AddRequestParam/AddRequestParam';
import EditEndpointModal from 'modals/EditEndpointModal/EditEndpointModal';

export default () => (
  <div>
    <AddEndpointModal />
    <AddUrlParam />
    <EditEndpointDescription />
    <AddResponseParam />
    <AddRequestParam />
    <EditEndpointModal />
  </div>
);
