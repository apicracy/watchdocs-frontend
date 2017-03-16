import React from 'react';
import styles from './Modal.css';
import Button from 'components/Button/Button';
import {
  Modal as ModalBootstrap,
} from 'react-bootstrap';

const Modal = ({ title, isShow, onHide, onSave, saveButtonText, cancelButtonText, children }) => (
  <ModalBootstrap show={isShow} backdrop onHide={onHide}>
    <ModalBootstrap.Header closeButton>
      <ModalBootstrap.Title>{title}</ModalBootstrap.Title>
    </ModalBootstrap.Header>
    <ModalBootstrap.Body>
      <div>
        { children }
      </div>
      <div className={styles.buttons}>
        <Button variants={['primary', 'large']} onClick={onSave}>{saveButtonText}</Button>
        <Button variants={['large']} onClick={onHide}>{cancelButtonText}</Button>
      </div>
    </ModalBootstrap.Body>

  </ModalBootstrap>
);

export default Modal;

Modal.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
  isShow: React.PropTypes.bool,
  onHide: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  saveButtonText: React.PropTypes.string,
  cancelButtonText: React.PropTypes.string,
};

Modal.defaultProps = {
  onHide: () => {},
  onSave: () => {},
  isShow: true,
  title: 'Add New',
  saveButtonText: 'Add New',
  cancelButtonText: 'Cancel',
};
