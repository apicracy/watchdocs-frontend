import React from 'react';
import styles from './CopyableCodeBlock.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import Icon from './Icon/Icon';

class CopyableCodeBlock extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
      React.PropTypes.node,
    ]),
    textToCopy: React.PropTypes.string,
  };

  render() {
    const { children, textToCopy } = this.props;

    return (
      <div>
        <div className={styles.code}>
          {children}
        </div>
        <CopyToClipboard text={textToCopy}>
          <Icon name="copy" />
        </CopyToClipboard>
      </div>
    );
  }
}

export default CopyableCodeBlock;
