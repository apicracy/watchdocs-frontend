import React from 'react';
import styles from './JSONSEditor.css';

import LineOfCode from './LineOfCode';

import {
  JSONSchemaToJSON,
  compareJSONSchema,
  acceptJSONSchema,
  rejectJSONSchema,
  cleanJSONSchema,
  JSONtoJSONSchema
} from 'services/JSONSchemaEditor';

class JSONSEditor extends React.Component {
  static propTypes = {
    base: React.PropTypes.object,
    draft: React.PropTypes.object,
    onSave: React.PropTypes.func,
  }

  componentWillMount() {
    this.setState({
      selectedLine: -1,
      linesOfCode: [],
      temp: {},
      output: {},
      invalidSchema: false,
      isDirty: false,
    });
    this.compare(this.props.base, this.props.draft);
  }

  onSelect = (selectedLine) => {
    this.setState({ selectedLine });
  }

  onSwitchReq = () => {
  }

  compare = (base, draft) => {
    const temp = compareJSONSchema(base, draft);
    const linesOfCode = JSONSchemaToJSON(temp);
    const textAreaLines = this.getLines(linesOfCode);
    this.setState({
      linesOfCode,
      tempLinesOfCode: linesOfCode,
      textAreaLines,
      tempTextAreaLines: textAreaLines,
      output: base,
      base,
      temp,
    });
  }

  onAccept = (index) => {
    const {
      temp,
    } = this.state;

    const newOutput = acceptJSONSchema(temp, index);
    const linesOfCode = JSONSchemaToJSON(newOutput);
    const textAreaLines = this.getLines(linesOfCode);
    this.setState({
      linesOfCode,
      textAreaLines,
      output: newOutput,
      isDirty: true,
    });
  }

  onReject = (index) => {
    const {
      temp,
      base,
    } = this.state;

    const newOutput = rejectJSONSchema(temp, index, base);
    const linesOfCode = JSONSchemaToJSON(newOutput);
    const textAreaLines = this.getLines(linesOfCode);
    this.setState({
      linesOfCode,
      textAreaLines,
      output: newOutput,
      isDirty: true,
    });

    this.onSave(cleanJSONSchema(newOutput));
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

  getLines = (linesOfCode) => {
    let lines = '';
    linesOfCode.map((line) => {
      lines += `${line.line}\n`;
      return null;
    });

    return lines;
  }


  getLineNumber = (event) => {
    const line = event.target.value.substr(0, event.target.selectionStart).split('\n').length - 1;
    this.onSelect(line);
  }

  onKeyDown = (e) => {
    if (e.keyCode === 9) { // tab was pressed
      // get caret position/selection
      const start = this.selectionStart;
      const end = this.selectionEnd;

      const target = e.target;
      const value = target.value;

      // set textarea value to: text before caret + tab + text after caret
      target.value = `${value.substring(0, start)}\t${value.substring(end)}`;

      // put caret at right position again (add one for the tab)
      this.selectionStart = this.selectionEnd = start + 1;

      // prevent the focus lose
      e.preventDefault();
    }
  }

  onChange = (event) => {
    const json = (event && event.target) ? event.target.value : {};

    const jsons = JSONtoJSONSchema(json);
    const lines = JSONSchemaToJSON(jsons);

    if (lines.length > 0) {
      const linesOfCode = lines;

      this.setState({
        linesOfCode,
        textAreaLines: this.getLines(lines),
        output: jsons,
      });

      this.setState({ isDirty: true, invalidSchema: false });
    } else {
      this.setState({
        invalidSchema: true,
        textAreaLines: json,
      });
    }
  }

  onCancel = () => {
    this.setState({
      linesOfCode: this.state.tempLinesOfCode,
      textAreaLines: this.state.tempTextAreaLines,
      output: this.state.temp,
      isDirty: false,
      invalidSchema: false,
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
      base,
    } = this.props;

    if (base && typeof base !== 'object') {
      return (<div>
        not valid base Object
      </div>);
    }

    const {
      linesOfCode,
      invalidSchema,
      textAreaLines,
    } = this.state;

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.rows}>
            {linesOfCode && linesOfCode.map((object, index) => {
              const {
                selectedLine,
              } = this.state;
              return (
                <LineOfCode
                  key={index}
                  isSelected={selectedLine === index}
                  isReq={object.isReq}
                  isOpt={object.isOpt}
                  toAdd={object.toAdd}
                  toRemove={object.toRemove}
                  typeChanged={object.typeChanged}
                  toChange={object.toChange}
                  addAction={object.addAction ? () => { this.onAccept(object.index); } : undefined}
                  removeAction={object.removeAction ?
                    () => { this.onAccept(object.index); } : undefined}
                  changeAction={object.changeAction ?
                    () => { this.onAccept(object.index); } : undefined}
                  onReject={() => { this.onReject(object.index); }}
                  isAccepted={object.isAccepted}
                  code={object.line}
                  onClick={() => { this.onSelect(index); }}
                  onSwitchReq={() => { this.onSwitchReq(index); }}
                />
              );
            })}
          </div>
          <div className={styles.textareaContainer}>
            <textarea
              onKeyUp={this.getLineNumber}
              onMouseUp={this.getLineNumber}
              onKeyDown={this.onKeyDown}
              style={{ height: `${25 * linesOfCode.length}px`, minHeight: '200px' }}
              className={styles.textarea}
              value={textAreaLines}
              onChange={this.onChange}
            />
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

export default JSONSEditor;
