import React from 'react';
import { connect } from 'react-redux';
import styles from './RequestParam.css';

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
import CustomIcon from 'components/Icon/CustomIcon';

import { openModal } from 'actions/modals';
import { setStatus, saveRequestParam, setRequestParam, addParam } from 'services/requestParams';
import { getFullLink } from 'services/helpers';

@connect(store => ({
  endpoint: store.endpointView,
  group: store.groupView,
  endpointList: store.endpoints,

  baseJSONSchema: store.requestParams.base,
  draftJSONSchema: store.requestParams.draft,
  headers: store.requestParams.headers,
  projectUrl: store.projects.activeProject.url,
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
    headers: React.PropTypes.array,
    projectUrl: React.PropTypes.array,
  }

  componentWillMount() {
    this.setState({ hasNewHeaders: false });
  }

  componentDidMount() {
    this.loadGroup();
    this.loadEndpoint();

    if (this.props.params.request_id) {
      const {
        dispatch,
      } = this.props;

      dispatch(setRequestParam(this.props.params.request_id));
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

  editParam = id => () => this.props.dispatch(openModal('addRequestParam', id));
  addParam = id => () => this.props.dispatch(addParam(id));

  renderParams() {
    // to keep order.
    // TODO create 'order' field in model to allow ordering
    const headers = this.props.headers.sort((a, b) => a.id > b.id);

    return headers.map((param, key) => {
      if (param.isNew) {
        this.setState({ hasNewHeaders: true });
      }

      return (
        <Row
          key={key}
          variants={[param.isNew ? 'isNew' : '']}
          data={[
            <Button variants={[param.isNew ? 'linkWhite' : 'linkPrimary']}>{param.name}</Button>,
            param.required ? 'required' : 'optional',
            (!param.description || !param.example) && !param.isNew ? <WarningLabel /> : '',
          ]}
          actions={!param.isNew ? [
            <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editParam(param.id)} />,
            !param.main && <IconButton icon={<Icon name="trash" size="lg" />} />,
          ] : [
            <IconButton icon={<Icon name="plus" size="lg" />} onClick={this.addParam(param.id)} />,
          ]}
        />
      );
    });
  }


  getFullLink = () => {
    const { projectUrl, group, endpoint } = this.props;
    return getFullLink(projectUrl, endpoint, group);
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

  render() {
    const {
      endpoint,
      baseJSONSchema,
      draftJSONSchema,
    } = this.props;

    return (
      <div className={styles.root}>
        <BackLink onClick={browserHistory.goBack}><b>{endpoint.method} {`"${endpoint.fullPath}"`}</b></BackLink>
        <div className={styles.title}>Add Request</div>
        <div className={styles.description}>Your request for endpoint
          <strong> {endpoint.method} {endpoint.fullPath}</strong> is outdated. Please
          fix issues below<br /><strong>Last check performed 2 hours ago.</strong></div>
        <DocumentationBlock
          title="Request Body"
          description="This is title of the section we're going
            to display in documentation and in navigation."
        >
          <JSONSEditor base={baseJSONSchema} draft={draftJSONSchema} onCompare={() => {}} />
        </DocumentationBlock>
        <DocumentationBlock
          title="Request Headers"
          titleElement={this.state.hasNewHeaders && (<div className={styles.headerDetected}><CustomIcon name="warning-circle" /> Add newly detected headers!</div>)}
          description="This is title of the section we're going
            to display in documentation and in navigation."
          emptyMsg="You don't have any response headers set up yet."
          buttonAction={() => {
            this.props.dispatch(openModal('addRequestParam'));
          }}
        >
          { this.renderParams() }
        </DocumentationBlock>

        <div className={styles.buttons}>
          <Button onClick={this.onSave} variants={['primary', 'large', 'spaceRight']}>Save</Button>
          <Button variants={['body', 'large']}>Preview</Button>
        </div>

      </div>
    );
  }
}

export default RequestParam;
