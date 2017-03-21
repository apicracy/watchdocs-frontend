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

    addAction: React.PropTypes.func,
    removeAction: React.PropTypes.func,
    changeAction: React.PropTypes.func,
    onReject: React.PropTypes.func,
    isAccepted: React.PropTypes.bool,
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
      addAction,
      removeAction,
      changeAction,
      onReject,
      isAccepted,
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
    if (toChange) {
      codeStyle = styles.yellowLine;
      attributeStyle = styles.yellowAttributeSpan;
    }

    if (typeChanged) {
      codeStyle = styles.yellowLine;
      attributeStyle = styles.yellowAttributeSpan;
    }

    if (toAdd) {
      codeStyle = styles.greenLine;
      attributeStyle = styles.greenAttributeSpan;
    }

    if (toRemove) {
      codeStyle = styles.redLine;
      attributeStyle = styles.redAttributeSpan;
    }

    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    let action = () => {};
    let actionText = '';
    let containerButtonStyles = styles.inactiveActionButton;
    let actionButton = styles.button;

    if (removeAction) {
      actionText = 'remove';
      action = removeAction;
      containerButtonStyles = (isAccepted !== undefined) ?
        styles.inactiveActionButton : styles.containerButtons;
      actionButton = styles.removeButton;
    }

    if (changeAction) {
      actionText = 'change';
      action = changeAction;
      containerButtonStyles = (isAccepted !== undefined) ?
        styles.inactiveActionButton : styles.containerButtons;
      actionButton = styles.changeButton;
    }

    if (addAction) {
      actionText = 'add';
      action = addAction;
      containerButtonStyles = (isAccepted !== undefined) ?
        styles.inactiveActionButton : styles.containerButtons;
      actionButton = styles.addButton;
    }

    return (
      <div className={styles.lineContainer}>
        <div onClick={onClick} className={lineStyle}>
          <div onClick={onSwitchReq} className={attributeStyle}>
            <span className={attributeSpan}>{attribute}</span>
          </div>
          <div className={codeStyle}>{code}</div>
        </div>
        <div className={containerButtonStyles}>
          <button className={actionButton} onClick={action}>{actionText}</button>
          <button className={styles.rejectButton} onClick={onReject}>reject</button>
        </div>
      </div>
    );
  }
}

export default LineOfCode;
