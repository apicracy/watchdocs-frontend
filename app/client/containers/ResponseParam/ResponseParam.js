import React from 'react';
import { connect } from 'react-redux';
import styles from './ResponseParam.css';

import { loadEndpoint } from 'services/endpointView';
import { loadGroup } from 'services/groupView';

import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import IconButton from 'components/Button/IconButton';
import BackLink from 'components/BackLink/BackLink';
import { browserHistory } from 'react-router';

import DocumentationBlock, { Row } from 'components/DocumentationBlock/DocumentationBlock';
import WarningLabel from 'components/DocumentationBlock/Labels/WarningLabel';
import JSONSEditor from 'components/JSONSEditor/JSONSEditor';
import Select from 'components/Form/Select/Select';
import CustomIcon from 'components/Icon/CustomIcon';

import { openModal } from 'actions/modals';
import { setStatus, saveResponseParam,
  setResponseParam, addParam, reset, saveJson,
} from 'services/responseParams';
import { getFullLink } from 'services/helpers';

@connect((store) => {
  const headers = (store.responseParams.headers) ?
    store.responseParams.headers.sort((a, b) => a.id > b.id) : [];
  const hasNewHeaders = !!headers.find(param => param.isNew);

  return {
    endpoint: store.endpointView,
    group: store.groupView,
    endpointList: store.endpoints,

    status: store.responseParams.status,
    baseJSONSchema: store.responseParams.base,
    draftJSONSchema: store.responseParams.draft,
    headers,
    hasNewHeaders,
    projectUrl: store.projects.activeProject.base_url,
  };
})
class ResponseParam extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    endpoint: React.PropTypes.object,
    group: React.PropTypes.object,
    endpointList: React.PropTypes.array,

    status: React.PropTypes.object,
    baseJSONSchema: React.PropTypes.object,
    draftJSONSchema: React.PropTypes.object,
    headers: React.PropTypes.array,
    projectUrl: React.PropTypes.string,
    hasNewHeaders: React.PropTypes.bool,
  }

  componentWillMount() {
    this.paramTypes = [
      { id: 200, name: '200 - OK' },
      { id: 201, name: '201 - Created' },
      { id: 204, name: '204 - No Content' },
      { id: 304, name: '304 - Not Modified' },
      { id: 400, name: '400 - Bad Request' },
      { id: 401, name: '401 - Unauthorized' },
      { id: 403, name: '403 - Forbidden' },
      { id: 404, name: '404 - Not Found' },
      { id: 409, name: '409 - Conflict' },
      { id: 422, name: '422 - Unauthorized' },
      { id: 500, name: '500 - Internal Server Error' },
    ];
  }

  componentDidMount() {
    this.loadGroup();
    this.loadEndpoint();

    const {
      dispatch,
    } = this.props;

    if (this.props.params.response_id) {
      dispatch(setResponseParam(this.props.params.response_id));
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

  editParam = id => () => this.props.dispatch(openModal('addResponseParam', id));
  addParam = id => () => this.props.dispatch(addParam(id));

  renderParams() {
    // to keep order.
    // TODO create 'order' field in model to allow ordering
    const headers = this.props.headers;

    return headers.map((param, key) => (
      <Row
        key={key}
        variants={[param.isNew ? 'isNew' : '']}
        data={[
          <Button variants={[param.isNew ? 'linkWhite' : 'linkPrimary']}>{param.key}</Button>,
          param.required ? 'required' : 'optional',
          (!param.description || !param.example_value) && !param.isNew ? <WarningLabel /> : '',
        ]}
        actions={!param.isNew ? [
          <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editParam(param.id)} />,
          !param.main && <IconButton icon={<Icon name="trash" size="lg" />} />,
        ] : [
          <IconButton icon={<Icon name="plus" size="lg" />} onClick={this.addParam(param.id)} />,
        ]}
      />
    ));
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

    dispatch(saveResponseParam());
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
      status,
      baseJSONSchema,
      draftJSONSchema,
    } = this.props;

    return (
      <div className={styles.root}>
        <BackLink onClick={browserHistory.goBack}><b>{endpoint.method} {`"${endpoint.url}"`}</b></BackLink>
        <div className={styles.title}>Add Response</div>
        <div className={styles.description}>Your request for endpoint
          <strong> {endpoint.method} {endpoint.url}</strong>.<br />
          <strong>Last check performed 2 hours ago.</strong></div>
        <DocumentationBlock
          title="Response status"
          description="This description will appear on your generated public documentation."
        >
          <Select
            variants={['fullWidth', 'bordered', 'whiteBackground']}
            options={this.paramTypes}
            activeId={status && status.id}
            onSelect={this.onTypeChange}
          />
        </DocumentationBlock>
        <DocumentationBlock
          title="Response Body"
          description="This is title of the section we're going
            to display in documentation and in navigation."
        >
          <JSONSEditor
            base={baseJSONSchema} draft={draftJSONSchema}
            onSave={this.onSaveJson}
          />
        </DocumentationBlock>
        <DocumentationBlock
          title="Response Headers"
          titleElement={this.props.hasNewHeaders && (<div className={styles.headerDetected}><CustomIcon name="warning-circle" /> Add newly detected headers!</div>)}
          description="This is title of the section we're going
            to display in documentation and in navigation."
          emptyMsg="You don't have any response headers set up yet."
          buttonAction={() => {
            this.props.dispatch(openModal('addResponseParam'));
          }}
        >
          { this.renderParams() }
        </DocumentationBlock>

        <div className={styles.buttons}>
          <Button onClick={this.onSave} variants={['primary', 'large', 'spaceRight']}>Save</Button>
          <Button variants={['body', 'large']}>Cancel</Button>
        </div>

      </div>
    );
  }
}

export default ResponseParam;
