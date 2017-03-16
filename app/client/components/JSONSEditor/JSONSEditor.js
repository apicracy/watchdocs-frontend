import React from 'react';
import styles from './JSONSEditor.css';

import LineOfCode from './LineOfCode';
import { JSONStoJSON } from 'services/JSONSEditor';

class JSONSEditor extends React.Component {
  static propTypes = {
    base: React.PropTypes.object,
    draft: React.PropTypes.object,
    onCompare: React.PropTypes.func,
  }

  componentWillMount() {
    this.setState({ selectedLine: -1 });
  }

  onSelect = (selectedLine) => {
    this.setState({ selectedLine });
  }

  compare = (base, draft) => {
    if (draft) {
      this.setState({ linesOfCode: JSONStoJSON(draft) });
      this.props.onCompare(draft);
    } else {
      this.setState({ linesOfCode: JSONStoJSON(base) });
      this.props.onCompare(base);
    }
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
            />
          );
        })}
      </div>
    );
  }
}

export default JSONSEditor;
