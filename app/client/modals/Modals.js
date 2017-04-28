import React from 'react';
import AddNewModal from 'modals/AddNewModal/AddNewModal';

/* Endpoint Documentation view modals */
import AddUrlParam from 'modals/AddUrlParam/AddUrlParam';
import EditEndpointDescription from 'modals/EditEndpointDescription/EditEndpointDescription';
import AddResponseParam from 'modals/AddResponseParam/AddResponseParam';
import AddRequestParam from 'modals/AddRequestParam/AddRequestParam';
import AddResponse from 'modals/addResponse/addResponse';

const Modals = ({ router, params }) => (
  <div>
    <AddNewModal />
    <AddUrlParam />
    <EditEndpointDescription />
    <AddResponseParam />
    <AddRequestParam />
    <AddResponse router={router} params={params} />
  </div>
);

Modals.propTypes = {
  router: React.PropTypes.object,
  params: React.PropTypes.object,
};

export default Modals;
