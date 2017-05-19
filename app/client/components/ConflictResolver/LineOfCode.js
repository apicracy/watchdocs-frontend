import React from 'react';
import styles from './ConflictResolver.css';

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
    let showButtons = true;

    if (toRemove) {
      actionText = 'remove';
      action = toRemove;
      containerButtonStyles = (isAccepted !== undefined) ?
        styles.inactiveActionButton : styles.redLine;
      actionButton = styles.removeButton;
      acceptedText = 'removed';
      isAcceptedStyle = styles.removeAccepted;
      showButtons = !toChange;
    }

    if (toAdd) {
      actionText = 'add';
      action = toAdd;
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
