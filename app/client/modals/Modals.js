
import React from 'react';
import { connect } from 'react-redux';

import AddNewModal from 'modals/AddNewModal/AddNewModal';
import EditModal from 'modals/EditModal/EditModal';

@connect(state => state)
export default class Modals extends React.Component {
  render() {
    // Add new modals here:
    return (
      <div>
        <AddNewModal />
        <EditModal />
      </div>
    );
  }
}
