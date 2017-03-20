
import React from 'react';

import AddNewModal from 'modals/AddNewModal/AddNewModal';
import EditModal from 'modals/EditModal/EditModal';

/* Endpoint Documentation view modals */
import AddUrlParam from 'modals/AddUrlParam/AddUrlParam';

export default () => (
  <div>
    <AddNewModal />
    <EditModal />
    <AddUrlParam />
  </div>
);
