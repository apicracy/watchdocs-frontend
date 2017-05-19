import React from 'react';
import styles from './ConflictResolver.css';
import LineOfCode from './LineOfCode';

class LinesGroup extends React.Component {
  constructor(props) {
    super(props);
    let lines = props.lines;
    if (!Array.isArray(lines)) {
      lines = [lines];
    }
    const { toChange, toAdd, toRemove } = lines[0];
    this.state = { lines, toChange, toAdd, toRemove };
  }

  componentWillReceiveProps(nextProps) {
    let lines = nextProps.lines;
    if (!Array.isArray(lines)) {
      lines = [lines];
    }
    const { toChange, toAdd, toRemove } = lines[0];
    this.setState({ lines, toChange, toAdd, toRemove });
  }

  wrapperStyles = () => {
    const classNames = [styles.linesGroup];
    if (this.actionRequired()) {
      classNames.push(styles.actionRequired);
    }
    return classNames.join(' ');
  }

  actionRequired = () => this.state.toAdd || this.state.toRemove

  render() {
    const { index, onAccept, onReject } = this.props;
    let { lines } = this.state;

    return (
      <div className={this.wrapperStyles()}>
        { this.actionRequired() &&
          <div className={styles.buttonContainer}>
            <button title="Accept" onClick={() => onAccept(index)} className={styles.addButton}>✓</button>
            <button title="Reject" onClick={() => onReject(index)} className={styles.removeButton}>✕</button>
          </div>
        }
        { lines.map((line) => (
          <LineOfCode
            key={line.id}
            isReq={line.isReq}
            isOpt={line.isOpt}
            toAdd={line.toAdd}
            toRemove={line.toRemove}
            toChange={line.toChange}
            isAccepted={line.isAccepted}
          />
        ))}
      </div>
    );
  }
};

export default LinesGroup;

