import React from 'react';
import CodeUtils from 'draft-js-code';
import Draft, { Editor, EditorState, RichUtils } from 'draft-js';

import styles from './CodeEditor.css';

import {
  contentStateFromPlainText,
} from 'services/codeEditorService';


class CodeEditor extends React.Component {
  static propTypes = {
    editorState: React.PropTypes.object,
    jsonIsValid: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    onChange: React.PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    this.checkReadOnlyChange(this.props.readOnly, nextProps.readOnly);
  }

  checkReadOnlyChange = (prevReadOnly, nextReadOnly) => {
    if (prevReadOnly && !nextReadOnly) {
      this.onFocus();
    }
  }

  onChange = (newState) => {
    this.props.onChange(newState);
  }

  onFocus = () => this.editor.focus();

  handleKeyCommand = (command) => {
    const { editorState } = this.props;
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
    const { editorState } = this.props;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      const command = CodeUtils.getKeyBinding(e);
      if (command) {
        return command;
      }
    }

    return Draft.getDefaultKeyBinding(e);
  }

  // TODO: Allow for multiline tabbing
  onTab = (e) => {
    const { editorState } = this.props;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState),
    );
  }

  onReturn = () => {
    const { editorState } = this.props;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const newContentState = Draft.Modifier.splitBlock(contentState, selection);
    const state = EditorState.push(editorState, newContentState, 'split-block');

    // Create new code block on Return key
    this.onChange(state);
  }

  handlePastedText = (pastedText) => {
    const { editorState } = this.props;
    const newState = contentStateFromPlainText(pastedText, editorState);
    this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));
    return true;
  }

  render() {
    const { editorState, jsonIsValid, readOnly } = this.props;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const className = 'RichEditor-editor';
    /* eslint-disable */
    return (
      <div>
        <div className={styles.codeEditor}>
          <div className={className} onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.keyBindingFn}
              onChange={this.onChange}
              handlePastedText={this.handlePastedText}
              ref={(editor) => { this.editor = editor; }}
              spellCheck
              handleReturn={this.onReturn}
              onTab={this.onTab}
              readOnly={readOnly}
            />
          </div>
        </div>
        { !jsonIsValid && <div className={styles.information}>JSON is not valid</div> }
      </div>
    );
    /* eslint-enable */
  }
}

export default CodeEditor;
