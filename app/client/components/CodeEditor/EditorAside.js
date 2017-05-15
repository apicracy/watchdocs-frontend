import React from 'react';
import styles from './EditorAside.css';

class EditorAside extends React.Component {
  static propTypes = {
    isReq: React.PropTypes.bool,
    isOpt: React.PropTypes.bool,
    isSelected: React.PropTypes.bool,
  };

  render() {
    const {
      isOpt,
      isReq,
      isSelected,
    } = this.props;

    const lineStyle = isSelected ? styles.oneLineSelected : styles.oneLine;
    let attributeSpan = styles.attributeSpan;

    let attribute;
    if (isOpt) {
      attribute = 'opt';
      attributeSpan = styles.attributeSpan;
    }

    if (isReq) {
      attribute = 'req';
      attributeSpan = styles.attributeSpanReq;
    }

    const attributeStyle = styles.attribute;
    /* eslint jsx-a11y/no-static-element-interactions: 0 */

    return (
      <div className={styles.lineContainer}>
        <div className={lineStyle}>
          <div className={attributeStyle}>
            <span className={attributeSpan}>{attribute}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorAside;
