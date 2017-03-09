
import React from 'react';
import { connect } from 'react-redux';

import ModifyEndpoint from 'modals/ModifyEndpoint';

@connect(state => state)
export default class Modals extends React.Component {
  render() {
    // Add new modals here:
    return (
      <ModifyEndpoint />
    );
  }
}
