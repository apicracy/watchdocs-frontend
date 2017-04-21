
import React from 'react';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce-input';

import styles from './Wiki.css';
import Button from 'components/Button/Button';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import TextInput from 'components/Form/TextInput/TextInput';
import { loadDocument } from 'services/documentView';

@connect(state => ({
  endpointList: state.endpoints,
  name: state.documentView.name,
  description: state.documentView.description,
}))
export default class Document extends React.Component {
  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    endpointList: React.PropTypes.array,
    dispatch: React.PropTypes.func,
  }

  componentWillMount() {
    this.loadDoc();
  }

  loadDoc() {
    this.props.dispatch(loadDocument(parseInt(this.props.params.document_id, 10)));
  }

  componentDidUpdate(prevProps) {
    const {
      document_id: documentId,
    } = this.props.params;

    // Reload view when endpoints are loaded
    if (prevProps.endpointList !== this.props.endpointList) {
      this.loadDoc();
    }

    if (
      prevProps.params.document_id !== documentId
    ) {
      this.loadDoc();
    }
  }

  render() {
    const {
      name,
      description,
    } = this.props;

    return (
      <div>
        <DocumentationBlock
          title="Document title"
          description="This is title of the section we're going
            to display in documentation and in navigation."
        >
          <TextInput value={name || ''} variant="white" />
        </DocumentationBlock>

        <DocumentationBlock
          title="Content"
          description="This description will
            appear on your generated public documentation."
        >
          <TinyMCE value={description || ''} />
        </DocumentationBlock>

        <div className={styles.buttons}>
          <Button variants={['primary', 'large', 'spaceRight']}>Save</Button>
          <Button variants={['body', 'large']}>Cancel</Button>
        </div>
      </div>
    );
  }
}
