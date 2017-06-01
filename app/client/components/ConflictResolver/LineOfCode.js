import React from 'react';
import styles from './ConflictResolver.css';

class LineOfCode extends React.Component {
  static propTypes = {
    isReq: React.PropTypes.bool,
    isOpt: React.PropTypes.bool,
    toAdd: React.PropTypes.bool,
    toRemove: React.PropTypes.bool,
    isAccepted: React.PropTypes.bool,
  };

  render() {
    const {
      isOpt,
      isReq,
      toAdd,
      toRemove,
      isAccepted,
    } = this.props;

    let attributeSpan = styles.attributeSpan;
    const lineContainerStyles = styles.lineContainer;

    let attribute;
    if (isOpt) {
      attribute = 'opt';
      attributeSpan = styles.attributeSpan;
    }

    if (isReq) {
      attribute = 'req';
      attributeSpan = styles.attributeSpanReq;
    }

    let attributeStyle = styles.attribute;
    let changeLineStyle = styles.unchangedLine;

    if (toAdd) {
      attributeStyle = styles.greenAttributeSpan;
      changeLineStyle = styles.greenLine;
    } else if (toRemove) {
      attributeStyle = styles.redAttributeSpan;
      changeLineStyle = styles.redLine;
    } else if (isAccepted) {
      attributeStyle = styles.acceptedAttributeSpan;
      changeLineStyle = styles.acceptedLine;
    }

    return (
      <div className={lineContainerStyles}>
        <div className={styles.oneLine}>
          <div className={attributeStyle}>
            <span className={attributeSpan}>{attribute}</span>
          </div>
        </div>
        <div className={changeLineStyle} />
      </div>
    );
  }
}

export default LineOfCode;
