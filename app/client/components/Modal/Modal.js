import React from 'react';
import styles from './Modal.css';
import Button from 'components/Button/Button';
import {
  Modal as ModalBootstrap,
} from 'react-bootstrap';

const Modal = ({ title, isShow, onHide, onSave, children }) => (
  <ModalBootstrap show={isShow} backdrop onHide={onHide}>
    <ModalBootstrap.Header closeButton>
      <ModalBootstrap.Title>{title}</ModalBootstrap.Title>
    </ModalBootstrap.Header>
    <ModalBootstrap.Body>
      <div>
        { children }
      </div>
      <div className={styles.buttons}>
        <Button primary onClick={onSave}>Add New</Button>
        <Button onClick={onHide}>Cancel</Button>
      </div>
    </ModalBootstrap.Body>

  </ModalBootstrap>
);

export default Modal;

Modal.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.object,
  isShow: React.PropTypes.bool,
  onHide: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
};

Modal.defaultProps = {
  onHide: () => {},
  onSave: () => {},
  isShow: true,
  title: 'Add New',
};
