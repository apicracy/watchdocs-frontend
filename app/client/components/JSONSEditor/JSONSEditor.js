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
    this.setState({ selectedLine: -1 });
    this.setState({ linesOfCode: [] });
    this.setState({ temp: {} });
    this.setState({ output: {} });
    this.setState({ invalidSchema: false });
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
    this.setState({ linesOfCode });
    const textAreaLines = this.getLines(linesOfCode);
    this.setState({ textAreaLines });
    this.setState({ output: base });
    this.setState({ base });
    this.setState({ temp });
    this.props.onCompare(cleanJSONS(base));
  }

  onAccept = (index) => {
    const {
      temp,
    } = this.state;

    const newOutput = acceptJSONS(temp, index);
    const linesOfCode = JSONStoJSON(newOutput);
    this.setState({ linesOfCode });
    const textAreaLines = this.getLines(linesOfCode);
    this.setState({ textAreaLines });
    this.setState({ output: newOutput });
    this.setState({ temp: newOutput });
    this.props.onCompare(cleanJSONS(newOutput));
  }

  onReject = (index) => {
    const {
      temp,
      base,
    } = this.state;

    const newOutput = rejectJSONS(temp, index, base);
    const linesOfCode = JSONStoJSON(newOutput);
    this.setState({ linesOfCode });
    const textAreaLines = this.getLines(linesOfCode);
    this.setState({ textAreaLines });
    this.setState({ output: newOutput });
    this.setState({ temp: newOutput });
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

  onChange = (event) => {
    const json = (event && event.target) ? event.target.value : {};

    const jsons = JSONtoJSONS(json);
    const lines = JSONStoJSON(jsons);
    const cleanSchema = cleanJSONS(jsons);
    this.setState({ textAreaLines: event.target.value });
    if (lines.length > 0) {
      const linesOfCode = lines;
      this.setState({ linesOfCode });
      this.setState({ textAreaLines: event.target.value });

      this.setState({ output: jsons });
      this.setState({ temp: jsons });
      this.props.onCompare(cleanSchema);
      this.setState({ invalidSchema: false });
    } else {
      this.setState({ invalidSchema: true });
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
        <div>
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
            style={{ height: `${25 * linesOfCode.length}px` }}
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
