import React from 'react';
import { flattenDeep } from 'lodash/array';
import { cloneDeep, isEmpty } from 'lodash/lang';

import styles from './JSONEditor.css';

import Button from '../Button/Button';
import CodeEditor from '../CodeEditor/CodeEditor';
import RequiredSwitch from './RequiredSwitch';

import { EditorState } from 'draft-js';
import {
  JSONSchemaToJSONLines,
  JSONtoJSONSchema,
  calculateRequired,
  fillSchemaWithRequired,
  indexSchemaNodes,
  changeRequiredForNode,
} from 'services/JSONSchemaService';

import {
  editorCodeEqual,
  createNewEditorState,
  formatJSON,
  createContentState,
} from 'services/codeEditorService';


class JSONEditor extends React.Component {
  static propTypes = {
    base: React.PropTypes.object,
    onSave: React.PropTypes.func,
  };

  componentWillMount() {
    this.setState({
      editorState: EditorState.createWithContent(createContentState([])),
      jsonIsValid: true,
      isDirty: false,
      editMode: false,
    });
    this.reset(this.props.base);
  }

  componentWillReceiveProps(nextProps) {
    this.reset(nextProps.base);
  }

  reset = (base) => {
    const indexedBase = indexSchemaNodes(base);
    const json = flattenDeep(JSONSchemaToJSONLines(indexedBase));
    const content = createContentState(json);

    this.setState({
      initialSchema: cloneDeep(indexedBase),
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

  onCancel = () => {
    const { initialSchema } = this.state;
    this.setState({ editMode: false });
    this.reset(initialSchema);
  }

  onSave = () => {
    const { editorState, initialSchema } = this.state;
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

  onRequiredChange = (nodeId) => {
    const { initialSchema } = this.state;
    const newSchema = changeRequiredForNode(initialSchema, nodeId);

    this.props.onSave(newSchema);
  }

  enterEditMode = () => {
    this.setState({
      editMode: true,
    });
  }

  render() {
    const { editorState, jsonIsValid, isDirty, editMode } = this.state;
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
              {lines.map((object) => {
                const data = object.getData().toJS();
                return (
                  <RequiredSwitch
                    key={data.id}
                    isReq={data.isReq}
                    isOpt={data.isOpt}
                    nodeId={data.nodeId}
                    onChange={this.onRequiredChange}
                  />
                );
              })}
            </div>
          }
          <div className={styles.editorContainer}>
            <CodeEditor
              editorState={editorState}
              readOnly={!editMode}
              jsonIsValid={jsonIsValid}
              onChange={this.onChange}
            />
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

export default JSONEditor;
