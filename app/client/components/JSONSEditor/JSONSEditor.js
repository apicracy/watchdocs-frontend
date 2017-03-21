import React from 'react';
import styles from './JSONSEditor.css';

import LineOfCode from './LineOfCode';
import { JSONStoJSON, compareJSONS, acceptJSONS, rejectJSONS, cleanJSONS } from 'services/JSONSEditor';

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
  }

  onSelect = (selectedLine) => {
    this.setState({ selectedLine });
  }

  onSwitchReq = () => {
  }

  compare = (base, draft) => {
    const temp = compareJSONS(base, draft);
    this.setState({ linesOfCode: JSONStoJSON(temp) });
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
    console.log(newOutput);

    this.setState({ linesOfCode: JSONStoJSON(newOutput) });
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
    console.log(newOutput);
    this.setState({ linesOfCode: JSONStoJSON(newOutput) });
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
    } = this.state;

    return (
      <div className={styles.container}>
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
    );
  }
}

export default JSONSEditor;
