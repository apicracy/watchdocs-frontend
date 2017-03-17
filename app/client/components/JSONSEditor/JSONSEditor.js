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
  }

  compare = (base, draft) => {
    const output = compareJSONS(base, draft);
    this.setState({ linesOfCode: JSONStoJSON(output) });
    this.setState({ output });
    this.props.onCompare(output);
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
