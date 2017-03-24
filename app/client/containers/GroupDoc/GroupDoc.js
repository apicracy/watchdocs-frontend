import React from 'react';
import { connect } from 'react-redux';

import styles from './GroupDoc.css';

import { loadGroup } from 'services/groupView';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import Button from 'components/Button/Button';
import TinyMCE from 'react-tinymce';

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
    this.setState({ security: null });
  }

  componentDidMount() {
    this.loadGroup();
  }

  loadGroup() {
    const groupId = parseInt(this.props.params.group_id, 10);
    this.props.dispatch(loadGroup(groupId));
  }

  onSecutityChange = (activatedItem) => {
    this.setState({ security: activatedItem.id });
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

  render() {
    const {
      group,
    } = this.props;

    return (
      <div>
        <DocumentationBlock
          title="Group title"
          description="This is title of the section we're going
            to display in documentation and in navigation."
        >
          <div className={styles.gettingStarted}>
            {group.groupName}
          </div>
        </DocumentationBlock>

        <DocumentationBlock
          title="Additional description"
          description="This description will
            appear on your generated public documentation."
        >
          <TinyMCE />
        </DocumentationBlock>

        <div className={styles.buttons}>
          <Button variants={['primary', 'large', 'spaceRight']}>Save</Button>
          <Button variants={['body', 'large']}>Preview</Button>
        </div>
      </div>
    );
  }
}

export default GroupDoc;
