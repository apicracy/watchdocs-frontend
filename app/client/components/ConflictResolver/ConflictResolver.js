import React from 'react';
import styles from './ConflictResolver.css';
import editorStyles from '../CodeEditor/CodeEditor.css';
import { flattenDeep } from 'lodash/array';
import { cloneDeep } from 'lodash/lang';
import LinesGroup from './LinesGroup';
import Button from '../Button/Button';

import {
  JSONSchemaToJSONLines,
  compareJSONSchemas,
  acceptChange,
  rejectChange,
  cleanJSONSchema,
} from 'services/JSONSchemaService';

import {
  Editor,
  EditorState,
} from 'draft-js';

import {
  createContentState,
} from 'services/codeEditorService';

class ConflictResolver extends React.Component {
  static propTypes = {
    base: React.PropTypes.object,
    draft: React.PropTypes.object,
    onSave: React.PropTypes.func,
  }

  componentWillMount() {
    this.setState({
      isDirty: false,
    });
    this.compare(this.props.base, this.props.draft);
  }

  componentDidUpdate(prevProps) {
    const {
      base,
      draft,
    } = this.props;
    if (prevProps.base !== base ||
    prevProps.draft !== draft) {
      this.compare(base, draft);
    }
  }

  compare = (base, draft) => {
    const diffSchema = compareJSONSchemas(
      cleanJSONSchema(base),
      cleanJSONSchema(draft),
    );
    const linesOfCode = JSONSchemaToJSONLines(diffSchema);
    this.setState({
      linesOfCode,
      resultSchema: diffSchema,
      initialDiffSchema: cloneDeep(diffSchema),
      editorState: this.editorLines(linesOfCode),
    });
  }

  editorLines = (linesOfCode) => {
    const flattenedLines = flattenDeep(linesOfCode);
    const editorContent = createContentState(flattenedLines);
    return EditorState.createWithContent(editorContent);
  }

  onAccept = (index) => {
    const { resultSchema, linesOfCode } = this.state;
    const groupToAccept = linesOfCode[index];

    if (!groupToAccept) {
      return;
    }

    const newResultSchema = acceptChange(resultSchema, groupToAccept);
    const newLines = JSONSchemaToJSONLines(newResultSchema);

    this.setState({
      resultSchema: newResultSchema,
      linesOfCode: newLines,
      editorState: this.editorLines(newLines),
      isDirty: true,
    });
  }

  onReject = (index) => {
    const { resultSchema, linesOfCode } = this.state;
    const groupToAccept = linesOfCode[index];

    if (!groupToAccept) {
      return;
    }

    const newResultSchema = rejectChange(resultSchema, groupToAccept);
    const newLines = JSONSchemaToJSONLines(newResultSchema);

    this.setState({
      resultSchema: newResultSchema,
      linesOfCode: newLines,
      editorState: this.editorLines(newLines),
      isDirty: true,
    });
  }

  onCancel = () => {
    const { initialDiffSchema } = this.state;
    const initialLines = JSONSchemaToJSONLines(initialDiffSchema);

    this.setState({
      resultSchema: cloneDeep(initialDiffSchema),
      linesOfCode: initialLines,
      editorState: this.editorLines(initialLines),
      isDirty: false,
    });
  }

  onSave = () => {
    this.props.onSave(
      cleanJSONSchema(this.state.resultSchema),
    );
  }

  render() {
    const {
      linesOfCode,
      editorState,
    } = this.state;

    const editorStyle = [
      editorStyles.codeEditor,
      editorStyles.light,
    ].join(' ');

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.rows}>
            {linesOfCode.map((group, index) => {
              let key;
              if (!Array.isArray(group)) {
                key = group.id.toString();
              } else {
                key = group[0].id.toString();
              }
              return (
                <LinesGroup
                  key={key}
                  lines={group}
                  index={index}
                  onAccept={this.onAccept}
                  onReject={this.onReject}
                />
              );
            })}
          </div>
          <div className={styles.textareaContainer}>
            <div className={editorStyle}>
              <div className={'RichEditor-editor'}>
                <Editor
                  editorState={editorState}
                  onChange={this.onChange}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        {
          this.state.isDirty && (
            <div className={styles.buttons}>
              <Button onClick={this.onSave} variants={['primary', 'large', 'spaceRight']}>Save</Button>
              <Button onClick={this.onCancel} variants={['body', 'large']}>Cancel</Button>
            </div>
          )
        }
      </div>
    );
  }
}

export default ConflictResolver;
