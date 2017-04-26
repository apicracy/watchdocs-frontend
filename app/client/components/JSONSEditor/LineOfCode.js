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
    let lineContainerStyles = styles.lineContainer;

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
    if (toChange) {
      attributeStyle = styles.yellowAttributeSpan;
    }

    if (typeChanged) {
      attributeStyle = styles.yellowAttributeSpan;
    }

    if (toAdd) {
      attributeStyle = styles.greenAttributeSpan;
    }

    if (toRemove) {
      attributeStyle = styles.redAttributeSpan;
      // isAccepted could be also undefined;
      if (isAccepted === true) {
        lineContainerStyles = styles.lineContainerHidden;
      }
    }

    // if accepted, restart styles
    if (isAccepted === true || isAccepted === false) {
      attributeStyle = styles.attribute;
    }

    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    let action = () => {};
    let actionText = '';
    let containerButtonStyles = styles.inactiveActionButton;
    let actionButton = styles.button;
    let acceptedText;
    let isAcceptedStyle;

    if (removeAction) {
      actionText = 'remove';
      action = removeAction;
      containerButtonStyles = (isAccepted !== undefined) ?
        styles.inactiveActionButton : styles.redLine;
      actionButton = styles.removeButton;
      acceptedText = 'removed';
      isAcceptedStyle = styles.removeAccepted;
    }

    if (changeAction) {
      actionText = 'change';
      action = changeAction;
      containerButtonStyles = (isAccepted !== undefined) ?
        styles.inactiveActionButton : styles.yellowLine;
      actionButton = styles.changeButton;
      acceptedText = 'changed';
      isAcceptedStyle = styles.changeAccepted;
    }

    if (addAction) {
      actionText = 'add';
      action = addAction;
      containerButtonStyles = (isAccepted !== undefined) ?
        styles.inactiveActionButton : styles.greenLine;
      actionButton = styles.addButton;
      acceptedText = 'added';
      isAcceptedStyle = styles.addAccepted;
    }

    return (
      <div className={lineContainerStyles}>
        <div onClick={onClick} className={lineStyle}>
          <div onClick={onSwitchReq} className={attributeStyle}>
            <span className={attributeSpan}>{attribute}</span>
          </div>
        </div>
        <div className={containerButtonStyles}>
          <button className={actionButton} onClick={action}>{actionText}</button>
          <button className={styles.rejectButton} onClick={onReject}>reject</button>
        </div>
        {
          isAccepted && <div className={isAcceptedStyle}>
            {acceptedText}
          </div>
        }
      </div>
    );
  }
}

export default LineOfCode;
