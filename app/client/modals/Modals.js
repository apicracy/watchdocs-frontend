import React from 'react';
import AddNewModal from 'modals/AddNewModal/AddNewModal';

/* Endpoint Documentation view modals */
import AddUrlParam from 'modals/AddUrlParam/AddUrlParam';
import EditEndpointDescription from 'modals/EditEndpointDescription/EditEndpointDescription';
import AddResponseParam from 'modals/AddResponseParam/AddResponseParam';
import AddRequestParam from 'modals/AddRequestParam/AddRequestParam';
import AddResponse from 'modals/addResponse/addResponse';

const Modals = ({ params }) => (
  <div>
    <AddNewModal />
    <AddUrlParam />
    <EditEndpointDescription />
    <AddResponseParam />
    <AddRequestParam />
    <AddResponse params={params} />
  </div>
);

Modals.propTypes = {
  params: React.PropTypes.object,
};

export default Modals;
