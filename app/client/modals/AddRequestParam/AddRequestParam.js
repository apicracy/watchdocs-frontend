import React from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import InputGroup from 'components/Form/InputGroup/InputGroup';
import TextInput from 'components/Form/TextInput/TextInput';
import TextArea from 'components/Form/TextArea/TextArea';
import CheckBox from 'components/Form/CheckBox/CheckBox';

import { closeModal } from 'actions/modals';
import { addHeader, updateHeader } from 'services/requestParams';

export const MODAL_NAME = 'addRequestParam';

const warningMessage = {
  type: 'warning',
  title: 'Doc Missing!',
  content: 'We have found that you miss description and/or example in your documentation. Please fill it in to make it easily accessible by end users.',
};

@connect(store => ({
  isVisible: !!store.modals[MODAL_NAME],
  modals: store.modals,

  headers: store.requestParams.headers,
}))
class addRequestParam extends React.Component {

  static propTypes = {
    isVisible: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    modals: React.PropTypes.object,
    headers: React.PropTypes.array,
  }

  componentWillMount() {
    this.reset();
  }

  componentWillReceiveProps(nextProps) {
    const { modals, headers } = this.props;

    if (nextProps.modals.refId && modals.refId !== nextProps.modals.refId) {
      const currentParam = headers.find(param => param.id === nextProps.modals.refId);

      if (currentParam) {
        this.setState({ ...currentParam });
      }
    }
  }

  reset = () => this.setState({
    id: null,
    key: '',
    required: false,
    description: '',
    type: 'string',
    example_value: '',
  });

  onSave = () => {
    // TODO validate
    // if id is not specified create new record
    if (!this.state.id) {
      const data = {
        ...this.state,
        id: (new Date()).getTime(),
      };

      this.props.dispatch(addHeader(data));
    } else {
      this.props.dispatch(updateHeader({ ...this.state }));
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

  onRequiredChange = () => this.setState({ required: !this.state.required });

  shouldDisplayMessage = () => {
    const { id, description, example_value } = this.state;
    /* eslint camelcase: 0*/
    return (id && (!description || !example_value));
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        title="Request param"
        onSave={this.onSave}
        onHide={this.onHide}
        saveButtonText="Save"
        cancelButtonText="Cancel"
        message={this.shouldDisplayMessage() ? warningMessage : null}
      >

        <InputGroup title="Name" description="Write here param name as it apears inside URL">
          <TextInput
            value={this.state.key || ''}
            placeholder="Param name"
            onChange={this.onFieldChange('key')}
            validation={new RegExp(/(^[a-zA-Z_$][a-zA-Z_\-$0-9]*$)/ig)}
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

        <InputGroup title="Description" description="Give user more context info about the param itself">
          <TextArea
            rows={3}
            value={this.state.description || ''}
            placeholder="Param description"
            onChange={this.onFieldChange('description')}
          />
        </InputGroup>

        <InputGroup title="Example" description="This examle is going to be used to generate user friendly documentation">
          <TextInput
            value={this.state.example_value || ''}
            placeholder="Example of param value"
            onChange={this.onFieldChange('example_value')}
          />
        </InputGroup>

      </Modal>
    );
  }
}

export default addRequestParam;
