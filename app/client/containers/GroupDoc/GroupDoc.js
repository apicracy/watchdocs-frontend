import React from 'react';
import { connect } from 'react-redux';

import styles from './GroupDoc.css';

import { loadGroup } from 'services/groupView';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import Button from 'components/Button/Button';
import TextInput from 'components/Form/TextInput/TextInput';
import TinyMCE from 'react-tinymce-input';

@connect(store => ({
  group: store.groupView,
  endpointList: store.endpoints,
}))
class GroupDoc extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    group: React.PropTypes.object,
    endpointList: React.PropTypes.array,
  }

  componentWillMount() {
    this.setState({
      description: '',
      name: '',
      isDirty: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    const conditions = [
      JSON.stringify(nextProps.group) !== JSON.stringify(this.props.group),
      this.state.description === '' && nextProps.group.description !== '',
      this.state.name === '' && nextProps.group.name !== '',
    ];

    // If at least one of above conditions is met, reload state.
    if (conditions.some(x => x)) {
      this.setState(nextProps.group);
    }
  }

  componentDidMount() {
    this.loadGroup();
  }

  loadGroup() {
    const groupId = parseInt(this.props.params.group_id, 10);
    this.props.dispatch(loadGroup(groupId));
  }

  componentDidUpdate(prevProps) {
    const {
      group_id: groupId,
    } = this.props.params;

    // Reload view when endpoints are loaded
    if (prevProps.endpointList !== this.props.endpointList) {
      this.loadGroup();
    }

    if (
      prevProps.params.group_id !== groupId &&
      this.props.group.id !== parseInt(groupId, 10)
    ) {
      this.loadGroup();
    }
  }

  onGroupDescriptionChange = description => this.setState({
    description,
    isDirty: true,
  });

  onFieldChange = fieldName => ({ nativeEvent }) => (
    this.setState({
      [fieldName]: nativeEvent.target.value,
      isDirty: true,
    })
  );

  onSave = () => {
    // TODO make an API call to save endpoint & refresh data in endpoint tree
  }

  onReset = () => {
    this.setState(this.props.group);
  }

  render() {
    const {
      description,
      name,
    } = this.state;

    return (
      <div className={styles.container}>
        <DocumentationBlock
          title="Group title"
          description="This is title of the section we're going
            to display in documentation and in navigation."
        >
          <TextInput
            value={name}
            variant="white"
            onChange={this.onFieldChange('name')}
          />
        </DocumentationBlock>

        <DocumentationBlock
          title="Additional description"
          description="This description will
            appear on your generated public documentation."
        >
          <TinyMCE
            value={description || ''}
            tinymceConfig={{
              plugins: 'autolink link image lists preview',
              toolbar: 'undo redo | bold italic underline',
            }}
            onChange={this.onGroupDescriptionChange}
          />
        </DocumentationBlock>

        <div className={styles.buttons}>
          <Button
            variants={['primary', 'large', 'spaceRight']}
            onClick={this.onSave}
          >Save</Button>
          <Button
            variants={['body', 'large']}
            onClick={this.onReset}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default GroupDoc;
