import React from 'react';
import { connect } from 'react-redux';
import styles from './EndpointDoc.css';

import { loadEndpoint } from 'services/endpointView';
import { loadGroup } from 'services/groupView';

import MethodPicker from 'components/MethodPicker/MethodPicker';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import Button from 'components/Button/Button';

@connect(store => ({
  endpoint: store.endpointView,
  group: store.groupView,
}))
class EndpointDoc extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    endpoint: React.PropTypes.object,
    group: React.PropTypes.object,
  }

  componentDidMount() {
    this.loadGroup();
    this.loadEndpoint();
  }

  componentDidUpdate() {
    const {
      endpoint_id: endpointId,
      group_id: groupId,
    } = this.props.params;

    if (this.props.endpoint.id !== parseInt(endpointId, 10)) {
      this.loadEndpoint();
    }

    if (this.props.group.id !== parseInt(groupId, 10)) {
      this.loadGroup();
    }
  }

  loadEndpoint() {
    this.props.dispatch(loadEndpoint(parseInt(this.props.params.endpoint_id, 10)));
  }

  loadGroup() {
    this.props.dispatch(loadGroup(parseInt(this.props.params.group_id, 10)));
  }

  render() {
    return (
      <div className={styles.root}>
        <MethodPicker
          activeId={this.props.endpoint.id}
          params={this.props.endpoint.params}
          groupEndpoints={this.props.group.endpoints}
          path={this.props.group.fullPath}
        />

        <DocumentationBlock
          title="Description"
          description="This description will appear on your generated public documentation."
          emptyMsg="Your endpoint does not have any description yet."
          buttonAction={() => {}}
        />

        <DocumentationBlock
          title="URL params"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          emptyMsg="You don't have any URL params set up yet."
          buttonAction={() => {}}
        />

        <DocumentationBlock
          title="Request"
          description="API's methods can support or require various HTTP headers."
          emptyMsg="You don't have request set up yet."
          buttonAction={() => {}}
        />

        <DocumentationBlock
          title="Responses Available"
          emptyMsg="You don't have any responses set up yet."
          buttonAction={() => {}}
        />

        <div className={styles.buttons}>
          <Button variants={['primary', 'large', 'spaceRight']}>Save</Button>
          <Button variants={['body', 'large']}>Preview</Button>
        </div>

      </div>
    );
  }
}

export default EndpointDoc;
