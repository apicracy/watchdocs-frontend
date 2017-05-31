import React from 'react';
import { connect } from 'react-redux';
import styles from './ResponseEditor.css';

import { loadEndpoint } from 'services/endpointEditor';
import { loadGroup } from 'services/groupEditor';

import ResponseStatusForm from 'components/ResponseForm/ResponseStatusForm';
import BackLink from 'components/BackLink/BackLink';
import { browserHistory } from 'react-router';

import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import JSONBodyManager from 'components/JSONBodyManager/JSONBodyManager';
import Notice from 'components/Notice/Notice';

import { loadResponse, reset, updateJsonSchema, updateHttpStatus } from 'services/responseEditor';
import { getFullLink } from 'services/helpers';

@connect(store => ({
  endpoint: store.endpointEditor,
  group: store.groupView,
  endpointList: store.endpoints,

  http_status_code: store.responseEditor.http_status_code,
  baseJSONSchema: store.responseEditor.body,
  draftJSONSchema: store.responseEditor.body_draft,
  status: store.responseEditor.status,
  projectUrl: store.projects.activeProject.base_url,
}))

class ResponseEditor extends React.Component {
  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    endpoint: React.PropTypes.object,
    group: React.PropTypes.object,
    endpointList: React.PropTypes.array,

    http_status_code: React.PropTypes.number,
    baseJSONSchema: React.PropTypes.object,
    draftJSONSchema: React.PropTypes.object,
    projectUrl: React.PropTypes.string,
    status: React.PropTypes.string,
  }

  componentDidMount() {
    this.loadGroup();
    this.loadEndpoint();

    const {
      dispatch,
      params,
    } = this.props;

    if (params.response_id) {
      dispatch(loadResponse(params.response_id));
    } else {
      dispatch(reset());
    }
  }

  componentWillUnmount() {
    this.props.dispatch(reset());
  }

  componentDidUpdate(prevProps) {
    const {
      endpoint_id: endpointId,
      group_id: groupId,
    } = this.props.params;

    // Reload view when endpoints are loaded
    if (prevProps.endpointList !== this.props.endpointList) {
      this.loadEndpoint();
      this.loadGroup();
    }

    if (
      prevProps.params.endpoint_id !== endpointId &&
      this.props.endpoint.id !== parseInt(endpointId, 10)
    ) {
      this.loadEndpoint();
    }

    if (
      prevProps.params.group_id !== groupId &&
      this.props.group.id !== parseInt(groupId, 10)
    ) {
      this.loadGroup();
    }
  }

  loadEndpoint() {
    this.props.dispatch(loadEndpoint(parseInt(this.props.params.endpoint_id, 10)));
  }

  loadGroup() {
    this.props.dispatch(loadGroup(parseInt(this.props.params.group_id, 10)));
  }

  getFullLink = () => {
    const { projectUrl, endpoint } = this.props;
    return getFullLink(projectUrl, endpoint);
  }

  onSaveStatus = ({ http_status_code }) => {
    const {
      dispatch,
      params,
    } = this.props;

    return dispatch(updateHttpStatus(params.response_id, http_status_code));
  }

  onSaveJsonSchema = (json) => {
    const {
      dispatch,
      params,
    } = this.props;

    return dispatch(updateJsonSchema(params.response_id, json));
  }

  render() {
    const {
      endpoint,
      baseJSONSchema,
      draftJSONSchema,
      http_status_code,
      status,
    } = this.props;

    return (
      <div className={styles.root}>
        <BackLink onClick={browserHistory.goBack}><b>{endpoint.method} {`"${endpoint.url}"`}</b></BackLink>
        <div className={styles.title}>Edit Response</div>
        <div className={styles.description}>Your response for endpoint
          <strong> {endpoint.method} {endpoint.url}</strong>
        </div>
        { status === 'outdated' && (
          <Notice icon="chain-broken" message="This response is outdated. Resolve conflicts in your response body below" />
        )}
        <DocumentationBlock
          title="Response status"
          description="This description will appear on your generated public documentation."
        >
          <ResponseStatusForm
            onSubmit={this.onSaveStatus}
            enableReinitialize // Refresh status when response loaded
            initialValues={{ http_status_code }}
          />
        </DocumentationBlock>
        <DocumentationBlock
          title="Response Body"
          description="This is title of the section we're going
            to display in documentation and in navigation."
        >
          <JSONBodyManager
            base={baseJSONSchema}
            draft={draftJSONSchema}
            onSave={this.onSaveJsonSchema}
          />
        </DocumentationBlock>
      </div>
    );
  }
}

export default ResponseEditor;
