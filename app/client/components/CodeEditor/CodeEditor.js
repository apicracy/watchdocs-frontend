import React from 'react';
import CodeUtils from 'draft-js-code';
import Draft from 'draft-js';

import styles from './CodeEditor.css';

import EditorAside from './EditorAside';

import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';

import {
  JSONSchemaToJSON,
  compareJSONSchema,
} from 'services/JSONSchemaEditor';

import {
  editorCodeEqual,
  createNewEditorState,
  formatJSON,
  contentStateFromPlainText,
  createContentState,
} from 'services/codeEditorService';


class CodeEditor extends React.Component {
  componentWillMount() {
    this.setState({
      editorState: EditorState.createWithContent(createContentState([])),
      jsonIsValid: true,
    });
  }

  componentDidUpdate(prevProps) {
    const { base } = this.props;
    if (prevProps.base !== base) {
      this.initializeEditor(base);
    }
  }

  initializeEditor = (base) => {
    const resultSchema = compareJSONSchema(base, base);
    const json = JSONSchemaToJSON(resultSchema);
    const content = createContentState(json);

    this.setState({
      editorState: EditorState.createWithContent(content),
    });
    return true;
  }

  onFocus = () => this.refs.editor.focus();

  onChange = (editorState) => {
    const prevCode = this.state.editorState.getCurrentContent().getPlainText();
    const nextCode = editorState.getCurrentContent().getPlainText();
    if (editorCodeEqual(prevCode, nextCode)) {
      this.setState({ editorState });
      return;
    }

    const formattedJSON = formatJSON(nextCode);
    if (formattedJSON.length > 0) { // is valid?
      const newContent = createContentState(formattedJSON);
      const newEditorState = createNewEditorState(editorState, newContent);
      this.setState({
        editorState: newEditorState,
        jsonIsValid: true,
      });
    } else {
      this.setState({
        editorState,
        jsonIsValid: false,
      });
    }
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  keyBindingFn = (e) => {
    const { editorState } = this.state;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      const command = CodeUtils.getKeyBinding(e);
      if (command) {
        return command;
      }
    }

    return Draft.getDefaultKeyBinding(e);
  }


  // TODO: Change tab to 2 spaces
  // TODO: Allow for multiline tabbing
  onTab = (e) => {
    const { editorState } = this.state;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState),
    );
  }

  onReturn = () => {
    const { editorState } = this.state;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const newContentState = Draft.Modifier.splitBlock(contentState, selection);
    const state = EditorState.push(editorState, newContentState, 'split-block');

    // Create new code block on Return key
    this.onChange(state);
    return true;
  }

  handlePastedText = (pastedText) => {
    const { editorState } = this.state;
    const newState = contentStateFromPlainText(pastedText, editorState);
    this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));
    return true;
  }

  render() {
    const { editorState, jsonIsValid } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const className = 'RichEditor-editor';
    const lines = editorState.getCurrentContent().getBlocksAsArray();

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.aside}>
            {lines && lines.map((object, index) => {
              const data = object.getData().toJS();
              return (
                <EditorAside
                  key={index}
                  isSelected={false}
                  isReq={data.isReq}
                  isOpt={data.isOpt}
                />
              );
            })}
          </div>
          <div className={styles.editorContainer}>
            <div className={styles.codeEditor}>
              <div className={className} onClick={this.focus}>
                <Editor
                  customStyleMap={styleMap}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  keyBindingFn={this.keyBindingFn}
                  onChange={this.onChange}
                  handlePastedText={this.handlePastedText}
                  ref="editor"
                  spellCheck
                  handleReturn={this.onReturn}
                  onTab={this.onTab}
                />
              </div>
            </div>
          </div>
        </div>
        { !jsonIsValid && <div className={styles.information}>JSON is not valid</div> }
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

export default CodeEditor;
