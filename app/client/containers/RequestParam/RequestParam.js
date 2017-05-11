import React from 'react';
import { connect } from 'react-redux';
import styles from './RequestParam.css';

import { loadEndpoint } from 'services/endpointView';
import { loadGroup } from 'services/groupView';

import BackLink from 'components/BackLink/BackLink';
import { browserHistory } from 'react-router';

import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import JSONSEditor from 'components/JSONSEditor/JSONSEditor';

import { setStatus, saveRequestParam,
  setRequestParam, reset, saveJson,
} from 'services/requestParams';
import { getFullLink } from 'services/helpers';

@connect(store => ({
  endpoint: store.endpointView,
  group: store.groupView,
  endpointList: store.endpoints,

  baseJSONSchema: store.requestParams.base,
  draftJSONSchema: store.requestParams.draft,
  projectUrl: store.projects.activeProject.base_url,
}))

class RequestParam extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    endpoint: React.PropTypes.object,
    group: React.PropTypes.object,
    endpointList: React.PropTypes.array,

    baseJSONSchema: React.PropTypes.object,
    draftJSONSchema: React.PropTypes.object,
    projectUrl: React.PropTypes.string,
  }

  componentDidMount() {
    this.loadGroup();
    this.loadEndpoint();

    const {
      dispatch,
    } = this.props;

    if (this.props.params.endpoint_id) {
      dispatch(setRequestParam(this.props.params.endpoint_id));
    } else {
      dispatch(reset());
    }
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

  onTypeChange = (id) => {
    const {
      dispatch,
    } = this.props;

    const selectedObject = this.paramTypes.find(p => p.id === id);
    dispatch(setStatus(selectedObject));
  }

  onSave = () => {
    const {
      dispatch,
    } = this.props;

    dispatch(saveRequestParam());
    browserHistory.goBack();
  }

  onSaveJson = (json) => {
    const {
      dispatch,
    } = this.props;

    dispatch(saveJson(this.props.params.endpoint_id, json));
  }

  render() {
    const {
      endpoint,
      baseJSONSchema,
      draftJSONSchema,
    } = this.props;

    return (
      <div className={styles.root}>
        <BackLink onClick={browserHistory.goBack}><b>{endpoint.method} {`"${endpoint.url}"`}</b></BackLink>
        <div className={styles.title}>Update Request</div>
        <div className={styles.description}>Your request for endpoint
          <strong> {endpoint.method} {endpoint.url}</strong>.<br />
          <strong>Last check performed 2 hours ago.</strong></div>
        <DocumentationBlock
          title="Request Body"
          description="This is title of the section we're going
            to display in documentation and in navigation."
        >
          <JSONSEditor base={baseJSONSchema} draft={draftJSONSchema} onSave={this.onSaveJson} />
        </DocumentationBlock>
      </div>
    );
  }
}

export default RequestParam;
