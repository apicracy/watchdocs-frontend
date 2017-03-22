import React from 'react';
import { connect } from 'react-redux';
import styles from './EndpointDoc.css';

import { loadEndpoint } from 'services/endpointView';
import { loadGroup } from 'services/groupView';

import MethodPicker from 'components/MethodPicker/MethodPicker';
import DocumentationBlock, { Row } from 'components/DocumentationBlock/DocumentationBlock';
import Button from 'components/Button/Button';
import Radio from 'components/Form/Radio/Radio';

import Icon from 'components/Icon/Icon';
import IconButton from 'components/Button/IconButton';

import { openModal } from 'actions/modals';

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

    if ((
      prevProps.endpoint.id !== parseInt(endpointId, 10)) &&
      this.props.endpoint.id !== parseInt(endpointId, 10)
    ) {
      this.loadEndpoint();
    }

    if ((
      prevProps.group.id !== this.props.endpoint.id) &&
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

  renderParams() {
    if (!this.props.endpoint || !this.props.endpoint.params) return [];

    return this.props.endpoint.params.map((param, key) => (
      <Row
        key={key}
        data={[
          <Button variants={['linkPrimary']}>{param.name}</Button>,
          param.type,
          param.required ? ', required' : ', optional',
        ]}
        actions={[
          <IconButton icon={<Icon name="pencil" size="lg" />} />,
          !param.main && <IconButton icon={<Icon name="trash" size="lg" />} />,
        ]}
      />
    ));
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
          description={[
            'Full link',
            <Button variants={['linkPrimary', 'highlight', 'spaceLeft']}>{`http://startjoin.com/api/v1${this.props.group.fullPath}`}</Button>,
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
          buttonAction={() => {}}
          content={(
            <Radio
              title={[
                'Select applicable authentications mechanisms.',
                <span className={styles.divider} />,
                <Button variants={['linkPrimary']}>Edit secure schemes</Button>,
              ]}
              activeId={this.state.security}
              options={[
                { id: 0, text: 'JWT' },
                { id: 1, text: 'OAuth 2.0' },
              ]}
              onChange={this.onSecutityChange}
            />
          )}
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
