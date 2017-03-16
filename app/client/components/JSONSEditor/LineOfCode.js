import React from 'react';
import styles from './JSONSEditor.css';

class LineOfCode extends React.Component {
  static propTypes = {
    isReq: React.PropTypes.bool,
    isOpt: React.PropTypes.bool,
    code: React.PropTypes.string,
    onClick: React.PropTypes.func,
    isSelected: React.PropTypes.bool,
  };

  render() {
    const {
      isOpt,
      isReq,
      code,
      onClick,
      isSelected,
    } = this.props;

    const lineStyle = isSelected ? styles.oneLineSelected : styles.oneLine;
    let attributeStyle = styles.attribute;

    let attribute;
    if (isOpt) {
      attribute = 'opt';
      attributeStyle = styles.attribute;
    }

    if (isReq) {
      attribute = 'req';
      attributeStyle = styles.attributeReq;
    }
    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    return (
      <div onClick={onClick} className={lineStyle}>
        <div className={attributeStyle}>{attribute}</div>
        <div className={styles.code}>{code}</div>
      </div>
    );
  }

  static defaultProps = {
  };
}

export default LineOfCode;
