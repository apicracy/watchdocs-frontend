import React from 'react';
import CodeUtils from 'draft-js-code';
import Draft from 'draft-js';
import { flattenDeep } from 'lodash/array';
import { cloneDeep, isEmpty } from 'lodash/lang';

import styles from './CodeEditor.css';

import Button from '../Button/Button';
import EditorAside from './EditorAside';

import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';

import {
  JSONSchemaToJSONLines,
  JSONtoJSONSchema,
  calculateRequired,
  fillSchemaWithRequired,
} from 'services/JSONSchemaService';

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
      isDirty: false,
      editMode: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.reset(nextProps.base);
  }

  reset = (base) => {
    const json = flattenDeep(JSONSchemaToJSONLines(base));
    const content = createContentState(json);

    this.setState({
      initialSchema: cloneDeep(base),
      editorState: EditorState.createWithContent(content),
      isDirty: false,
      jsonIsValid: true,
      editMode: false,
    });
    if (isEmpty(base)) {
      this.setState({
        editorState: EditorState.createWithContent(createContentState([])),
        editMode: true,
      });
    }
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
        isDirty: true,
      });
    } else {
      this.setState({
        editorState,
        jsonIsValid: false,
        isDirty: true,
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
  }

  handlePastedText = (pastedText) => {
    const { editorState } = this.state;
    const newState = contentStateFromPlainText(pastedText, editorState);
    this.onChange(EditorState.push(editorState, newState, 'insert-fragment'));
    return true;
  }

  onCancel = () => {
    const { initialSchema } = this.state;
    this.setState({ editMode: false });
    this.reset(initialSchema);
  }

  onSave = () => {
    const { editorState, editMode, initialSchema } = this.state;
    if (editMode) {
      const newJson = editorState.getCurrentContent().getPlainText();
      const newSchema = JSONtoJSONSchema(newJson);
      let mergedSchema;

      if (!isEmpty(initialSchema)) {
        mergedSchema = calculateRequired(initialSchema, newSchema);
      } else {
        mergedSchema = fillSchemaWithRequired(newSchema);
      }
      this.props.onSave(mergedSchema).then(() => {
        this.setState({ editMode: false });
      });
    }
  }

  enterEditMode = () => {
    this.setState({
      editMode: true,
    });
    this.onFocus();
  }

  render() {
    const { editorState, jsonIsValid, isDirty, editMode } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const className = 'RichEditor-editor';
    const lines = editorState.getCurrentContent().getBlocksAsArray();

    return (
      <div>
        <div className={styles.container}>
          { !editMode &&
            <div className={styles.editButton}>
              <Button onClick={this.enterEditMode} variants={['primary']}>
                Edit
              </Button>
            </div>
          }
          { !editMode &&
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
          }
          <div className={styles.editorContainer}>
            <div className={styles.codeEditor}>
              <div className={className} onClick={this.focus}>
                <Editor
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  keyBindingFn={this.keyBindingFn}
                  onChange={this.onChange}
                  handlePastedText={this.handlePastedText}
                  ref="editor"
                  spellCheck
                  handleReturn={this.onReturn}
                  onTab={this.onTab}
                  readOnly={!editMode}
                />
              </div>
            </div>
          </div>
        </div>
        { !jsonIsValid && <div className={styles.information}>JSON is not valid</div> }
        {
          editMode && (
            <div className={styles.buttons}>
              { isDirty &&
                <Button onClick={this.onSave} disabled={!jsonIsValid} variants={['primary', 'large', 'spaceRight']}>Save</Button>
              }
              <Button onClick={this.onCancel} variants={['body', 'large']}>Cancel</Button>
            </div>
          )
        }
      </div>
    );
  }
}

export default CodeEditor;
