
import React from 'react';
import { connect } from 'react-redux';
import AddNewModal from './AddNewModal/AddNewModal';
import { setVisibility } from 'services/modifyEndpoint-service';

@connect(state => ({
  isVisible: state.modifyEndpoint.isVisible,
}))
export default class ModifyEndpoint extends React.Component {
  static propTypes = {
    isVisible: React.PropTypes.bool,
    dispatch: React.PropTypes.bool,
  };

  render() {
    const {
      isVisible,
    } = this.props;

    return (
      <AddNewModal
        isShow={isVisible}
        onSave={this.onSave}
        onHide={this.onHide}
      />
    );
  }

  onSave = () => {
    this.props.dispatch(setVisibility(false));
  }

  onHide = () => {
    this.props.dispatch(setVisibility(false));
  }
}
