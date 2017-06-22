import React from 'react';
import { connect } from 'react-redux';

import styles from './GroupEditor.css';

import { loadGroup, updateGroup, removeGroup } from 'services/groupEditor';
import UpdateGroupForm from 'components/GroupForm/UpdateGroupForm';
import Button from 'components/Button/Button';

@connect(store => ({
  group: store.groupEditor,
  endpointList: store.endpoints,
}))
class GroupEditor extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    group: React.PropTypes.object,
  }

  componentDidMount() {
    this.loadGroup();
  }

  componentDidUpdate(prevProps) {
    const { group_id } = this.props.params;

    if (prevProps.params.group_id !== group_id) {
      this.loadGroup();
    }
  }

  loadGroup() {
    const groupId = parseInt(this.props.params.group_id, 10);
    this.props.dispatch(loadGroup(groupId));
  }

  onSave = (values) => {
    const { id } = this.props.group;
    const { dispatch } = this.props;

    return dispatch(updateGroup(id, values));
  }

  removeGroup = () => {
    const { id } = this.props.group;
    const { dispatch } = this.props;

    return dispatch(removeGroup(id));
  }

  render() {
    const { group } = this.props;

    return (
      <div className={styles.container}>
        <UpdateGroupForm
          enableReinitialize // Refresh when group loads
          onSubmit={this.onSave}
          initialValues={{ name: group.name, description: group.description }}
        />
        <Button variants={['text', 'warning']} onClick={this.removeGroup}>Remove this group</Button>
      </div>
    );
  }
}

export default GroupEditor;
