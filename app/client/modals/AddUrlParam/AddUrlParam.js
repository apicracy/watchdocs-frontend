import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import InputGroup from 'components/Form/InputGroup/InputGroup';
import TextInput from 'components/Form/TextInput/TextInput';
import TextArea from 'components/Form/TextArea/TextArea';
import CheckBox from 'components/Form/CheckBox/CheckBox';
import Select from 'components/Form/Select/Select';

import { closeModal } from 'actions/modals';
import { addEndpointParam, updateEndpointParam } from 'actions/endpointView';

export const MODAL_NAME = 'addUrlParam';

const warningMessage = {
  type: 'warning',
  title: 'Doc Missing!',
  content: 'We have found that you miss description and/or example in your documentation. Please fill it in to make it easily accessible by end users.',
};

@connect(store => ({
  isVisible: !!store.modals[MODAL_NAME],
  endpoint: store.endpointView,
  modals: store.modals,
}))
class AddUrlParam extends React.Component {

  static propTypes = {
    isVisible: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    modals: React.PropTypes.object,
    endpoint: React.PropTypes.object,
  }

  componentWillMount() {
    this.reset();

    this.paramTypes = [
      { id: 1, name: 'number' },
      { id: 2, name: 'string' },
      { id: 3, name: 'array' },
    ];
  }

  getSelectedId = (value) => {
    const record = this.paramTypes.find(p => p.name === value);

    return record ? record.id : null;
  }

  getSelectedValue = (id) => {
    const record = this.paramTypes.find(p => p.id === id);

    return record ? record.name : null;
  }

  componentWillReceiveProps(nextProps) {
    const { modals, endpoint } = this.props;

    if (nextProps.modals.refId && modals.refId !== nextProps.modals.refId) {
      const currentParam = endpoint.params.find(param => param.id === nextProps.modals.refId);

      if (currentParam) {
        this.setState({ ...currentParam });
      }
    }
  }

  reset = () => this.setState({
    id: null,
    main: false,
    name: '',
    required: false,
    description: '',
    type: null,
    example: '',
  });

  onSave = () => {
    // TODO validate
    // if id is not specified create new record
    if (!this.state.id) {
      const data = {
        ...this.state,
        id: (new Date()).getTime(),
      };

      this.props.dispatch(addEndpointParam(data));
    } else {
      this.props.dispatch(updateEndpointParam({ ...this.state }));
    }

    this.props.dispatch(closeModal(MODAL_NAME));
    this.reset();
  }

  onHide = () => {
    this.props.dispatch(closeModal(MODAL_NAME));
    this.reset();
  }

  onFieldChange = fieldName => ({ nativeEvent }) => (
    this.setState({ [fieldName]: nativeEvent.target.value })
  );

  onTypeChange = id => this.setState({ type: this.getSelectedValue(id) });

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
        onSave={this.onSave}
        onHide={this.onHide}
        saveButtonText="Save"
        cancelButtonText="Cancel"
        message={this.shouldDisplayMessage() ? warningMessage : null}
      >

        <InputGroup title="Name" description="Write here param name as it apears inside URL">
          <TextInput
            value={this.state.name}
            placeholder="Param name"
            onChange={this.onFieldChange('name')}
            validation={new RegExp(/(^[a-zA-Z_$][a-zA-Z_$0-9]*$)/ig)}
            validationErrorMsg={'URL parameter should include only allowed URL characters.'}
          />

          <CheckBox
            activeIds={[this.state.required ? 1 : null]}
            options={[
              { id: 1, text: 'Param required' },
            ]}
            onChange={this.onRequiredChange}
          />
        </InputGroup>

        <InputGroup title="Type" description="Give user more information about data type of param">
          <Select
            variants={['fullWidth', 'bordered']}
            options={this.paramTypes}
            activeId={this.getSelectedId(this.state.type)}
            onSelect={this.onTypeChange}
          />
        </InputGroup>

        <InputGroup title="Description" description="Give user more context info about the param itself">
          <TextArea
            rows={3}
            value={this.state.description}
            placeholder="Param description"
            onChange={this.onFieldChange('description')}
          />
        </InputGroup>

        <InputGroup title="Example" description="This examle is going to be used to generate user friendly documentation">
          <TextInput
            value={this.state.example}
            placeholder="Example of param value"
            onChange={this.onFieldChange('example')}
          />
        </InputGroup>

      </Modal>
    );
  }
}

export default AddUrlParam;
