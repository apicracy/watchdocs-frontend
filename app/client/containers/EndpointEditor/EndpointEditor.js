import React from 'react';
import { connect } from 'react-redux';
import styles from './EndpointEditor.css';

import {
  openEditor,
  closeEditor,
  loadEndpoint,
  removeEndpoint,
  removeUrlParams,
  removeResponse,
} from 'services/endpointEditor';

import Button from 'components/Button/Button';
import Header from 'components/Header/Header';

import Icon from 'components/Icon/Icon';
import IconButton from 'components/Button/IconButton';
import Notice from 'components/Notice/Notice';
import Link from 'components/NavigationLink/LinkWrapper';

import DocumentationBlock, { Row } from 'components/DocumentationBlock/DocumentationBlock';
import WarningLabel from 'components/DocumentationBlock/Labels/WarningLabel';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

/* Actions */
import { updateEndpointDescription } from 'actions/endpointEditor';

import {
  setMethod,
  setUrl,
  setEdit as editEndpoint,
} from 'services/modifyEndpoint-service';

/* Modals */
import { openModal } from 'actions/modals';
import { MODAL_NAME as EDIT_DESC_MODAL } from 'modals/EditEndpointDescription/EditEndpointDescription';
import { MODAL_NAME as EDIT_URL_MODAL } from 'modals/EditEndpointModal/EditEndpointModal';
import { getFullLink } from 'services/helpers';

@connect(store => ({
  endpoint: store.endpointEditor,
  responses: store.endpointEditor.responses,
  projectUrl: store.projects.activeProject.base_url,
  isFetching: store.endpointEditor.isFetching,
}))
class EndpointEditor extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    endpoint: React.PropTypes.object,
    router: React.PropTypes.object,
    responses: React.PropTypes.array,
    projectUrl: React.PropTypes.string,
    isFetching: React.PropTypes.bool,
  }

  componentWillMount() {
    this.setState({ security: null });
    this.props.dispatch(openEditor());
  }

  componentWillUnmount() {
    this.props.dispatch(closeEditor());
  }

  componentDidMount() {
    this.loadEndpoint();
  }

  componentDidUpdate(prevProps) {
    const {
      endpoint_id: endpointId,
    } = this.props.params;

    if (
      prevProps.params.endpoint_id !== endpointId &&
      this.props.endpoint.id !== parseInt(endpointId, 10)
    ) {
      this.loadEndpoint();
    }
  }

  loadEndpoint() {
    this.props.dispatch(loadEndpoint(parseInt(this.props.params.endpoint_id, 10)));
  }

  onSecutityChange = (activatedItem) => {
    this.setState({ security: activatedItem.id });
  }

  /* Description section */
  editDescription = () => this.props.dispatch(openModal(EDIT_DESC_MODAL));
  editUrl = () => {
    const {
      method,
      url,
    } = this.props.endpoint;
    this.props.dispatch(setMethod(method));
    this.props.dispatch(setUrl(url));
    this.props.dispatch(editEndpoint(true));

    this.props.dispatch(openModal(EDIT_URL_MODAL));
  }

  renderDescription = () => {
    const { description } = this.props.endpoint;

    if (!this.props.endpoint || !description) return [];

    return [
      <Row
        key={1}
        data={[
          <Button key={1} variants={['linkPrimary', 'block', 'textLeft', 'noPaddingLeft']}>{ description.title }</Button>,
          description.content,
        ]}
        actions={[
          <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editDescription} />,
          <IconButton icon={<Icon name="trash" size="lg" />} onClick={() => this.props.dispatch(updateEndpointDescription(null))} />,
        ]}
      />,
    ];
  }

  /* Params section */
  editParam = id => () => this.props.dispatch(openModal('addUrlParam', id));
  editResponse = id => () => this.props.router.push(`/${this.props.params.project_name}/editor/endpoint/${this.props.params.endpoint_id}/response/${id}`);
  editRequest = () => () => this.props.router.push(`/${this.props.params.project_name}/editor/endpoint/${this.props.params.endpoint_id}/request`);

  renderParams() {
    if (!this.props.endpoint || !this.props.endpoint.url_params) return [];

    // to keep order.
    // TODO create 'order' field in model to allow ordering
    const params = this.props.endpoint.url_params.sort((a, b) => a.id > b.id);

    return params.map((param, key) => (
      <Row
        key={key}
        data={[
          <Button variants={['linkPrimary', 'noPaddingLeft']}>{param.name}</Button>,
          param.data_type ? `${param.data_type}, ${String.fromCharCode(160)}` : null,
          param.required ? 'required' : 'optional',
          (param.status === 'outdated') ? <WarningLabel message="Outdated!" /> : '',
        ]}
        actions={[
          <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editParam(param.id)} />,
          !param.is_part_of_url && <IconButton onClick={() => { this.onRemoveUrlParam(param.id); }} icon={<Icon name="trash" size="lg" />} />,
        ]}
      />
    ));
  }

  onRemoveUrlParam = (id) => {
    if (confirm('Are you sure you want to remove URL Param? This action can not be undone.')) {
      this.props.dispatch(removeUrlParams(id));
    }
  }

  onRemoveResponse = (id) => {
    if (confirm('Are you sure you want to remove this response? This action can not be undone.')) {
      this.props.dispatch(removeResponse(id));
    }
  }

  renderResponses() {
    // to keep order.
    // TODO create 'order' field in model to allow ordering
    const responses = this.props.responses.sort((a, b) => a.http_status_code > b.http_status_code);

    return responses.map((response, key) => (
      <Row
        key={key}
        data={[
          <div>Status <span className={styles.responseParam}>{`${response.http_status_code ? response.http_status_code : ''}`}</span></div>,
          (response.status === 'outdated') ? <WarningLabel message="Outdated!" /> : '',
        ]}
        actions={[
          <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editResponse(response.id)} />,
          <IconButton icon={<Icon name="trash" size="lg" />} onClick={() => { this.onRemoveResponse(response.id); }} />,
        ]}
      />
    ));
  }

  renderRequest() {
    const conditions = [
      !this.props.endpoint,
      !this.props.endpoint.request,
    ];

    if (conditions.some(x => x)) return [];

    const { endpoint } = this.props;

    return [
      <Row
        key={1}
        data={[
          <Button variants={['linkPrimary', 'noPaddingLeft']}>{endpoint.method}</Button>,
          endpoint.url,
          (endpoint.request && endpoint.request.status === 'outdated') ? <WarningLabel message="Outdated!" /> : '',
        ]}
        actions={[
          <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editRequest()} />,
        ]}
      />,
    ];
  }

  getFullLink = () => {
    const { projectUrl, endpoint } = this.props;
    return getFullLink(projectUrl, endpoint);
  }

  removeEndpoint = () => {
    /* eslint no-alert: 0 */
    if (confirm('Do you really want to remove this endpoint? This action can not be undone. All connected data will be lost.')) {
      this.props.dispatch(removeEndpoint());
    }
  }

  render() {
    const { endpoint } = this.props;

    return (
      <div className={styles.root} id="endpoint-editor">
        { this.props.isFetching && <LoadingIndicator /> }

        <Header title="Endpoint editor">
          <Button variants={['rounded', 'body']} icon={<Icon name="trash" size="lg" />} onClick={this.removeEndpoint}>
            Remove endpoint
          </Button>
        </Header>

        { endpoint.status === 'outdated' && (
          <Notice type="warning" icon="chain-broken" message="This endpoint is outdated. This means one of responses, url params or request is no longer up to date with data received from your app" />
        )}
        <div className={styles.urlContainer} id="endpoint-editor-method">
          <div className={styles.method}>
            { endpoint && endpoint.method}
          </div>
          <div className={styles.url}>
            { endpoint && endpoint.url }
          </div>
          <div className={styles.editUrl}>
            <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editUrl} />
          </div>
        </div>
        <DocumentationBlock
          title="Description"
          description="This description will appear on your generated public documentation."
          emptyMsg="Your endpoint does not have any description yet."
          buttonAction={this.props.endpoint.description ? null : this.editDescription}
          id="endpoint-editor-description"
        >
          { this.renderDescription() }
        </DocumentationBlock>

        <DocumentationBlock
          title="URL params"
          id="endpoint-editor-params"
          description={[
            'Full link',
            <Button variants={['linkPrimary', 'highlight', 'spaceLeft']}>{ this.getFullLink() }</Button>,
            <Link to="/settings">Edit base url</Link>,
          ]}
          emptyMsg="You don't have any URL params set up yet."
          buttonAction={() => {
            this.props.dispatch(openModal('addUrlParam'));
          }}
        >
          { this.renderParams() }
        </DocumentationBlock>

        <DocumentationBlock
          title="Request"
          description="API's methods can support or require various HTTP headers."
          emptyMsg="You don't have request set up yet."
          id="endpoint-editor-request"
        >
          { this.renderRequest() }
        </DocumentationBlock>

        <DocumentationBlock
          title="Responses"
          description="List of all available responses for given endpoint"
          emptyMsg="You don't have any responses set up yet."
          id="endpoint-editor-responses"
          buttonAction={() => {
            this.props.dispatch(openModal('addResponse'));
          }}
        >
          { this.renderResponses() }
        </DocumentationBlock>

        <div className={styles.buttons}>

        </div>

      </div>
    );
  }
}

export default EndpointEditor;
