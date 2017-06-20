import React from 'react';
import AddEndpointModal from 'modals/AddEndpointModal/AddEndpointModal';

/* Endpoint Documentation view modals */
import AddUrlParam from 'modals/AddUrlParam/AddUrlParam';
import EditEndpointDescription from 'modals/EditEndpointDescription/EditEndpointDescription';
import AddRequestHeader from 'modals/AddRequestHeader/AddRequestHeader';
import AddResponseHeader from 'modals/AddResponseHeader/AddResponseHeader';
import EditEndpointModal from 'modals/EditEndpointModal/EditEndpointModal';
import AddResponse from 'modals/AddResponse/AddResponse';
import EditProject from 'modals/EditProject/EditProject';

const Modals = ({ params }) => (
  <div>
    <AddEndpointModal />
    <AddUrlParam />
    <EditEndpointDescription />
    <AddRequestHeader />
    <AddResponseHeader />
    <EditEndpointModal />
    <EditProject />
    <AddResponse params={params} />
  </div>
);

Modals.propTypes = {
  params: React.PropTypes.object,
};

export default Modals;
