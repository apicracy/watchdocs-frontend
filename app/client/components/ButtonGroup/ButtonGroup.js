import React from 'react';
import styles from './ButtonGroup.css';

const ButtonGroup = ({ children }) => (
  <div className={styles.buttons}>
    { children }
  </div>
);

ButtonGroup.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.node,
  ]),
};

export default ButtonGroup;
