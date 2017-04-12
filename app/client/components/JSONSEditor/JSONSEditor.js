import React from 'react';
import styles from './JSONSEditor.css';

import LineOfCode from './LineOfCode';
import { JSONStoJSON, compareJSONS, acceptJSONS, rejectJSONS, cleanJSONS, JSONtoJSONS } from 'services/JSONSEditor';

class JSONSEditor extends React.Component {
  static propTypes = {
    base: React.PropTypes.object,
    draft: React.PropTypes.object,
    onCompare: React.PropTypes.func,
  }

  componentWillMount() {
    this.setState({
      selectedLine: -1,
      linesOfCode: [],
      temp: {},
      output: {},
      invalidSchema: false,
    });
    this.compare(this.props.base, this.props.draft);
  }

  onSelect = (selectedLine) => {
    this.setState({ selectedLine });
  }

  onSwitchReq = () => {
  }

  compare = (base, draft) => {
    const temp = compareJSONS(base, draft);
    const linesOfCode = JSONStoJSON(temp);
    const textAreaLines = this.getLines(linesOfCode);
    this.setState({
      linesOfCode,
      textAreaLines,
      output: base,
      base,
      temp,
    });

    this.props.onCompare(cleanJSONS(base));
  }

  onAccept = (index) => {
    const {
      temp,
    } = this.state;

    const newOutput = acceptJSONS(temp, index);
    const linesOfCode = JSONStoJSON(newOutput);
    const textAreaLines = this.getLines(linesOfCode);
    this.setState({
      linesOfCode,
      textAreaLines,
      output: newOutput,
      temp: newOutput,
    });
    this.props.onCompare(cleanJSONS(newOutput));
  }

  onReject = (index) => {
    const {
      temp,
      base,
    } = this.state;

    const newOutput = rejectJSONS(temp, index, base);
    const linesOfCode = JSONStoJSON(newOutput);
    const textAreaLines = this.getLines(linesOfCode);
    this.setState({
      linesOfCode,
      textAreaLines,
      output: newOutput,
      temp: newOutput,
    });

    this.props.onCompare(cleanJSONS(newOutput));
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

    const jsons = JSONtoJSONS(json);
    const lines = JSONStoJSON(jsons);

    if (lines.length > 0) {
      const cleanSchema = cleanJSONS(jsons);

      const linesOfCode = lines;

      this.setState({
        linesOfCode,
        textAreaLines: this.getLines(lines),
        output: jsons,
        temp: jsons,
      });

      this.props.onCompare(cleanSchema);
      this.setState({ invalidSchema: false });
    } else {
      this.setState({
        invalidSchema: true,
        textAreaLines: json,
      });
    }
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
    );
  }
}

export default JSONSEditor;
