import React from 'react';
import { connect } from 'react-redux';

import styles from './GroupEditor.css';

import { loadGroup, updateGroup, removeGroup } from 'services/groupEditor';
import UpdateGroupForm from 'components/GroupForm/UpdateGroupForm';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import Icon from 'components/Icon/Icon';

@connect(store => ({
  group: store.groupEditor,
  endpointList: store.endpoints.list,
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
    if (confirm('Are you sure you want to remove this group? This action can not be undone and all endpoints and groups within will be lost')) {
      return dispatch(removeGroup(id));
    }
  }

  render() {
    const { group } = this.props;

    return (
      <div className={styles.container}>
        <Header title="Group editor">
          <Button variants={['rounded', 'body']} icon={<Icon name="trash" size="lg" />} onClick={this.removeGroup}>
            Remove group
          </Button>
        </Header>
        <UpdateGroupForm
          enableReinitialize // Refresh when group loads
          onSubmit={this.onSave}
          initialValues={{ name: group.name, description: group.description }}
        />
      </div>
    );
  }
}

export default GroupEditor;
