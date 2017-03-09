import React from 'react';
import styles from './Button.css';

const IconButton = ({ onClick, icon }) => (
  <button className={styles.small} onClick={onClick}>
    { icon }
  </button>
);

IconButton.propTypes = {
  onClick: React.PropTypes.func,
  icon: React.PropTypes.node,
};

export default IconButton;
