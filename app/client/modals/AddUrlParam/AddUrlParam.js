import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import UrlParamForm from 'components/UrlParamForm/UrlParamForm';
import Notice from 'components/Notice/Notice';

import { closeModal } from 'actions/modals';
import { addEndpointParam, updateEndpointParam } from 'services/endpointEditor';
import { valueTypes } from 'config';

export const MODAL_NAME = 'addUrlParam';

const warningMessage = {
  type: 'warning',
  title: 'Doc Missing!',
  content: 'We have found that you miss description and/or example in your documentation. Please fill it in to make it easily accessible by end users.',
};

@connect(store => ({
  isVisible: !!store.modals[MODAL_NAME],
  endpoint: store.endpointEditor,
  modals: store.modals,
  endpointId: store.endpointEditor.id,
}))
class AddUrlParam extends React.Component {

  static propTypes = {
    isVisible: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    modals: React.PropTypes.object,
    endpoint: React.PropTypes.object,
    endpointId: React.PropTypes.number,
  }

  paramTypes = [
    { value: 'number', label: 'number' },
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'boolean', label: 'boolean' },
  ];

  componentWillMount() {
    this.reset();
  }

  componentWillReceiveProps(nextProps) {
    nextProps.modals.refId && this.setEditedParam(nextProps.modals.refId);
  }

  reset = () => this.setState({
    id: null,
    endpoint_id: this.props.endpointId,
    name: '',
    required: false,
    description: '',
    data_type: null,
    example: '',
    is_part_of_url: false,
  });

  setEditedParam = (urlParamId) => {
    const { endpoint } = this.props;
    const currentParam = endpoint.url_params.find(param => (
      param.id === urlParamId
    ));
    currentParam && this.setState({ ...currentParam });
  }

  onSave = () => {
    let response;
    const data = {
      ...this.state,
      endpoint_id: this.props.endpointId,
    };

    if (!this.state.id) {
      response = this.props.dispatch(addEndpointParam(data));
    } else {
      response = this.props.dispatch(updateEndpointParam(data));
    }

    return response.then(() => {
      this.props.dispatch(closeModal(MODAL_NAME));
      this.reset();
    });
  }

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
    this.reset();
  }

  onFieldChange = fieldName => ({ nativeEvent }) => (
    this.setState({ [fieldName]: nativeEvent.target.value })
  );

  onTypeChange = (e, newValue) => (
    this.setState({ data_type: newValue })
  );

  onRequiredChange = () => this.setState({ required: !this.state.required });

  shouldDisplayMessage = () => {
    const { id, description, example } = this.state;
    return (id && (!description || !example));
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        title="URL param"
        onHide={this.onHide}
        message={this.shouldDisplayMessage() ? warningMessage : null}
      >
        { this.state.status === 'outdated' && (
          <Notice icon="bell" message={`It seems like this param is ${this.state.required ? 'optional' : 'always'} in a request. Please update 'Param required' field.`} />
        )}
        <UrlParamForm
          {...this.state}
          paramTypes={valueTypes}
          onFieldChange={this.onFieldChange}
          onRequiredChange={this.onRequiredChange}
          onTypeChange={this.onTypeChange}
          onCancel={this.onHide}
          onSubmit={this.onSave}
          initialValues={this.state}
        />
      </Modal>
    );
  }
}

export default AddUrlParam;
