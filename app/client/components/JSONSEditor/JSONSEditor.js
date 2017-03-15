import React from 'react';
import styles from './JSONSEditor.css';

import LineOfCode from './LineOfCode';
import { JSONStoJSON } from 'services/JSONSEditor';

class JSONSEditor extends React.Component {
  static propTypes = {
    base: React.PropTypes.object,
  };

  componentWillMount() {
    this.setState({ selectedLine: -1 });
  }

  onSelect = (selectedLine) => {
    this.setState({ selectedLine });
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

    const linesOfCode = JSONStoJSON(base);

    return (
      <div className={styles.container}>
        {linesOfCode.map((object, index) => {
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

  static defaultProps = {
  };
}

export default JSONSEditor;
