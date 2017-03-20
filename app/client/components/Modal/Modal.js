import React from 'react';
import styles from './Modal.css';
import Button from 'components/Button/Button';

class Modal extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    isShow: React.PropTypes.bool,
    onHide: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    saveButtonText: React.PropTypes.string,
    cancelButtonText: React.PropTypes.string,
  }

  static defaultProps = {
    onHide: () => {},
    onSave: () => {},
    isVisible: false,
    title: 'Add New',
    saveButtonText: 'Add New',
    cancelButtonText: 'Cancel',
  }

  onOverlayClick = ({ nativeEvent }) => {
    if (nativeEvent.target.attributes['data-dismiss']) {
      this.props.onHide();
    }
  }

  render() {
    const { isVisible, title, children } = this.props;

    if (!isVisible) return null;

    return (
      <div className={styles.overlay} onClick={this.onOverlayClick} data-dismiss>
        <section className={styles.root}>
          <header className={styles.header}>
            { title } <Button onClick={this.props.onHide}>X</Button>
          </header>
          <main className={styles.body}>
            { children }
          </main>
          <footer className={styles.buttons}>
            <Button variants={['primary', 'large']} onClick={this.props.onSave}>{this.props.saveButtonText}</Button>
            <Button variants={['large']} onClick={this.props.onHide}>{this.props.cancelButtonText}</Button>
          </footer>
        </section>
      </div>
    );
  };
}

export default Modal;
