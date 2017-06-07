import React from 'react';
import styles from './CopyableCodeBlock.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import Icon from '../Icon/Icon';

class CopyableCodeBlock extends React.Component {
  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
      React.PropTypes.node,
    ]),
    textToCopy: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  toggleCopied = (double = false) => {
    this.setState({ copied: !this.state.copied });
    if (!double) {
      return;
    }
    setTimeout(() => this.toggleCopied(), 2000);
  }

  render() {
    const { copied } = this.state;
    const { children, textToCopy } = this.props;

    return (
      <div className={styles.codeBlock}>
        <div className={styles.code}>
          {children}
        </div>
        <div className={styles.copy}>
          {copied &&
            <div className={styles.copy__notification}>
              Copied to clipboard!
            </div>
          }
          <CopyToClipboard text={textToCopy} onCopy={() => this.toggleCopied(true)}>
            <button className={styles.copy__button}><Icon name="clipboard" /></button>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

export default CopyableCodeBlock;
