import React from 'react';
import styles from './ConflictResolver.css';
import editorStyles from '../CodeEditor/CodeEditor.css';
import { flattenDeep } from 'lodash/array';
import LinesGroup from './LinesGroup';

import {
  JSONSchemaToJSON,
  compareJSONSchema,
  acceptJSONSchema,
  rejectJSONSchema,
  cleanJSONSchema,
  JSONtoJSONSchema,
} from 'services/JSONSchemaEditor';

import {
  Editor,
  EditorState,
  RichUtils,
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
    const diff = compareJSONSchema(
      cleanJSONSchema(base),
      cleanJSONSchema(draft),
    );
    const linesOfCode = JSONSchemaToJSON(diff);
    this.setState({
      linesOfCode,
      initialLinesOfCode: linesOfCode,
      editorState: this.editorLines(linesOfCode),
    });
  }

  editorLines = (linesOfCode) => {
    const flattenedLines = flattenDeep(linesOfCode);
    const editorContent = createContentState(flattenedLines);
    return EditorState.createWithContent(editorContent);
  }

  onAccept = (index) => {
    const { linesOfCode } = this.state;
    const groupToAccept = linesOfCode[index];

    if (!groupToAccept) {
      return;
    }

    let acceptedLines = groupToAccept.filter(line => !line.toRemove);
    acceptedLines = acceptedLines.map((line) => {
      const acceptedLine = line;
      acceptedLine.isAccepted = true;
      acceptedLine.toAdd = false;
      acceptedLine.toChange = false;
      return acceptedLine;
    });
    linesOfCode[index] = acceptedLines;
    const newLines = linesOfCode.filter(group => !Array.isArray(group) || group.length > 0);

    this.setState({
      linesOfCode: newLines,
      editorState: this.editorLines(newLines),
      isDirty: true,
    });
  }

  onReject = (index) => {
    const { linesOfCode } = this.state;
    const groupToReject = linesOfCode[index];

    if (!groupToReject) {
      return;
    }

    let rejectedLines = groupToReject.filter(line => !line.toAdd);
    rejectedLines = rejectedLines.map((line) => {
      const rejectedLine = line;
      rejectedLine.isAccepted = true;
      rejectedLine.toRemove = false;
      rejectedLine.toChange = false;
      return rejectedLine;
    });
    linesOfCode[index] = rejectedLines;
    const newLines = linesOfCode.filter(group => !Array.isArray(group) || group.length > 0);

    this.setState({
      linesOfCode: newLines,
      editorState: this.editorLines(newLines),
      isDirty: true,
    });
  }

  onCancel = () => {
    this.setState({
      linesOfCode: this.state.initialLinesOfCode,
      editorState: this.editorLines(this.state.initialLinesOfCode),
      isDirty: false,
    });
  }

  onSave = () => {
    this.setState({
      tempLinesOfCode: this.state.linesOfCode,
      tempTextAreaLines: this.state.textAreaLines,
      temp: this.state.output,
      isDirty: false,
      invalidSchema: false,
    });

    this.props.onSave(cleanJSONSchema(this.state.output));
  }

  render() {
    const {
      linesOfCode,
      invalidSchema,
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
          { invalidSchema && <div className={styles.information}>JSON Schema is not valid</div> }
        </div>
        {
          this.state.isDirty && (
            <div>
              <button className={styles.acceptButton} onClick={this.onSave}>Save</button>
              <button className={styles.acceptButton} onClick={this.onCancel}>Cancel</button>
            </div>
          )
        }
      </div>
    );
  }
}

export default ConflictResolver;
