import React from 'react';
import styles from './JSONSEditor.css';

class LineOfCode extends React.Component {
  static propTypes = {
    isReq: React.PropTypes.bool,
    isOpt: React.PropTypes.bool,
    toAdd: React.PropTypes.bool,
    typeChanged: React.PropTypes.bool,
    toChange: React.PropTypes.bool,
    toRemove: React.PropTypes.bool,
    code: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onSwitchReq: React.PropTypes.func,
    isSelected: React.PropTypes.bool,
  };

  render() {
    const {
      isOpt,
      isReq,
      toAdd,
      typeChanged,
      toChange,
      toRemove,
      code,
      onClick,
      isSelected,
      onSwitchReq,
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

    let codeStyle = styles.code;
    let attributeStyle = styles.attribute;
    if (toAdd) {
      codeStyle = styles.greenLine;
      attributeStyle = styles.greenAttributeSpan;
    }

    if (typeChanged) {
      codeStyle = styles.yellowLine;
      attributeStyle = styles.yellowAttributeSpan;
    }

    if (toChange) {
      codeStyle = styles.yellowLine;
      attributeStyle = styles.yellowAttributeSpan;
    }

    if (toRemove) {
      codeStyle = styles.redLine;
      attributeStyle = styles.redAttributeSpan;
    }
    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    return (
      <div onClick={onClick} className={lineStyle}>
        <div onClick={onSwitchReq} className={attributeStyle}>
          <span className={attributeSpan}>{attribute}</span>
        </div>
        <div className={codeStyle}>{code}</div>
      </div>
    );
  }
}

export default LineOfCode;
