import React from 'react';
import styles from './Modal.css';
import Button from 'components/Button/Button';
import CustomIcon from 'components/Icon/CustomIcon';

class Modal extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    isVisible: React.PropTypes.bool,
    onHide: React.PropTypes.func.isRequired,
    message: React.PropTypes.object,
  }

  static defaultProps = {
    onHide: () => {},
    isVisible: false,
    title: 'Add New',
    message: null,
  }

  onOverlayClick = ({ nativeEvent }) => {
    if (nativeEvent.target.attributes['data-dismiss']) {
      this.props.onHide();
    }
  }

  render() {
    const { isVisible, title, children, message } = this.props;

    if (!isVisible) return null;
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={styles.overlay} onClick={this.onOverlayClick} data-dismiss>
        <div className={styles.root}>
          <header className={styles.header}>
            { title } <Button onClick={this.props.onHide} icon={<CustomIcon name="close-button" />} />
          </header>
          { message && (
            <div className={styles.message}>
              <h3 className={styles.message__title}> { message.title }</h3>
              <p className={styles.message__content}> {message.content }</p>
            </div>
          )}
          <main className={styles.body}>
            { children }
          </main>
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

export default Modal;
