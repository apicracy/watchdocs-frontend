import React from 'react';
import { connect } from 'react-redux';
import styles from './EndpointDoc.css';

import { loadEndpoint } from 'services/endpointView';
import { loadGroup } from 'services/groupView';

import MethodPicker from 'components/MethodPicker/MethodPicker';
import Button from 'components/Button/Button';

import Icon from 'components/Icon/Icon';
import IconButton from 'components/Button/IconButton';

import DocumentationBlock, { Row } from 'components/DocumentationBlock/DocumentationBlock';
import WarningLabel from 'components/DocumentationBlock/Labels/WarningLabel';

/* Actions */
import { updateEndpointDescription } from 'actions/endpointView';

/* Modals */
import { openModal } from 'actions/modals';
import { MODAL_NAME as EDIT_DESC_MODAL } from 'modals/EditEndpointDescription/EditEndpointDescription';
import { getFullLink } from 'services/helpers';

@connect(store => ({
  endpoint: store.endpointView,
  group: store.groupView,
  endpointList: store.endpoints,
  responses: store.endpointView.responses,
  projectUrl: store.projects.activeProject.base_url,
}))
class EndpointDoc extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    endpoint: React.PropTypes.object,
    group: React.PropTypes.object,
    endpointList: React.PropTypes.array,
    router: React.PropTypes.object,
    responses: React.PropTypes.array,
    projectUrl: React.PropTypes.string,
  }

  componentWillMount() {
    this.setState({ security: null });
  }

  componentDidMount() {
    this.loadGroup();
    this.loadEndpoint();
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

  onSecutityChange = (activatedItem) => {
    this.setState({ security: activatedItem.id });
  }

  /* Description section */
  editDescription = () => this.props.dispatch(openModal(EDIT_DESC_MODAL));

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
  editResponse = id => () => this.props.router.push(`/${this.props.params.project_name}/editor/${this.props.params.group_id}/endpoint/${this.props.params.endpoint_id}/response/${id}`);
  editRequest = () => () => this.props.router.push(`/${this.props.params.project_name}/editor/${this.props.params.group_id}/endpoint/${this.props.params.endpoint_id}/request`);

  renderParams() {
    if (!this.props.endpoint || !this.props.endpoint.params) return [];

    // to keep order.
    // TODO create 'order' field in model to allow ordering
    const params = this.props.endpoint.params.sort((a, b) => a.id > b.id);

    return params.map((param, key) => (
      <Row
        key={key}
        data={[
          <Button variants={['linkPrimary', 'noPaddingLeft']}>{param.name}</Button>,
          param.data_type ? `${param.data_type}, ${String.fromCharCode(160)}` : null,
          param.required ? 'required' : 'optional',
          (!param.description || !param.example) ? <WarningLabel /> : '',
        ]}
        actions={[
          <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editParam(param.id)} />,
          !param.is_part_of_url && <IconButton icon={<Icon name="trash" size="lg" />} />,
        ]}
      />
    ));
  }

  renderResponses() {
    // to keep order.
    // TODO create 'order' field in model to allow ordering
    const responses = this.props.responses.sort((a, b) => a.id > b.id);

    return responses.map((param, key) => (
      <Row
        key={key}
        data={[
          <div>Status <span className={styles.responseParam}>{`${param.http_status_code ? param.http_status_code : ''}`}</span></div>,
        ]}
        actions={[
          <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editResponse(param.id)} />,
          <IconButton icon={<Icon name="trash" size="lg" />} />,
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

    return [
      <Row
        key={1}
        data={[
          <Button variants={['linkPrimary', 'noPaddingLeft']}>{this.props.endpoint.method}</Button>,
          this.props.endpoint.url,
        ]}
        actions={[
          <IconButton icon={<Icon name="pencil" size="lg" />} onClick={this.editRequest()} />,
          <IconButton icon={<Icon name="trash" size="lg" />} />,
        ]}
      />,
    ];
  }

  getFullLink = () => {
    const { projectUrl, endpoint } = this.props;
    return getFullLink(projectUrl, endpoint);
  }

  render() {
    return (
      <div className={styles.root}>
        <MethodPicker endpoint={this.props.endpoint} />

        <DocumentationBlock
          title="Description"
          description="This description will appear on your generated public documentation."
          emptyMsg="Your endpoint does not have any description yet."
          buttonAction={this.props.endpoint.description ? null : this.editDescription}
        >
          { this.renderDescription() }
        </DocumentationBlock>

        <DocumentationBlock
          title="URL params"
          description={[
            'Full link',
            <Button variants={['linkPrimary', 'highlight', 'spaceLeft']}>{ this.getFullLink() }</Button>,
            <Button variants={['linkPrimary']}>Edit base url</Button>,
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
          buttonAction={this.props.responses[0] ? null : () => {
            this.props.router.push(`/${this.props.params.project_name}/editor/${this.props.params.group_id}/endpoint/${this.props.params.endpoint_id}/request`);
          }}
          // content={(
          //   <Radio
          //     title={[
          //       'Select applicable authentications mechanisms.',
          //       <span className={styles.divider} />,
          //       <Button variants={['linkPrimary']}>Edit secure schemas</Button>,
          //     ]}
          //     activeId={this.state.security}
          //     options={[
          //       { id: 0, text: 'JWT' },
          //       { id: 1, text: 'OAuth 2.0' },
          //     ]}
          //     onChange={this.onSecutityChange}
          //   />
          // )}
        >
          { this.renderRequest() }
        </DocumentationBlock>

        <DocumentationBlock
          title="Responses"
          description="List of all available responses for given endpoint"
          emptyMsg="You don't have any responses set up yet."
          buttonAction={() => {
            this.props.router.push(`/${this.props.params.project_name}/editor/${this.props.params.group_id}/endpoint/${this.props.params.endpoint_id}/response`);
          }}
        >
          { this.renderResponses() }
        </DocumentationBlock>

        <div className={styles.buttons}>
          <Button variants={['primary', 'large', 'spaceRight']}>Save</Button>
          <Button variants={['body', 'large']}>Cancel</Button>
        </div>

      </div>
    );
  }
}

export default EndpointDoc;
