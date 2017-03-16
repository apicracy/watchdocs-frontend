import React from 'react';
import styles from './JSONSEditor.css';

import LineOfCode from './LineOfCode';
import { JSONStoJSON, compareJSONS } from 'services/JSONSEditor';

class JSONSEditor extends React.Component {
  static propTypes = {
    base: React.PropTypes.object,
    draft: React.PropTypes.object,
    onCompare: React.PropTypes.func,
  }

  componentWillMount() {
    this.setState({ selectedLine: -1 });
    this.setState({ linesOfCode: [] });
    this.setState({ output: {} });
  }

  onSelect = (selectedLine) => {
    this.setState({ selectedLine });
  }

  onSwitchReq = () => {
    // const {
    //   linesOfCode,
    // } = this.state;
    //
    // const newLinesOfCode = [].concat(...linesOfCode);
    // if (typeof newLinesOfCode[index].isReq === 'boolean') {
    //   newLinesOfCode[index].isReq = !newLinesOfCode[index].isReq;
    //   newLinesOfCode[index].isOpt = !newLinesOfCode[index].isOpt;
    // }
    //
    // const newOutput = JSONtoJSONS(newLinesOfCode);
    // this.props.onCompare(newOutput);
  }

  compare = (base, draft) => {
    if (draft) {
      this.setState({ linesOfCode: JSONStoJSON(draft) });
      const newOutput = draft;
      this.setState({ output: newOutput });
      this.props.onCompare(newOutput);
    } else if (base) {
      this.setState({ linesOfCode: JSONStoJSON(base) });
      const newOutput = base;
      this.setState({ output: newOutput });
      this.props.onCompare(newOutput);
    } else {
      this.props.onCompare(this.state.output);
    }

    compareJSONS(base, draft);
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
