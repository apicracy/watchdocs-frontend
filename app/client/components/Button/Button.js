import React from 'react';
import styles from './Button.css';

const Button = ({ onClick, children, primary }) => {
  const buttonStyle = primary ? styles.buttonBlue : styles.button;

  return (
    <button
      onClick={onClick}
      className={buttonStyle}
    > { children }
    </button>
  );
};

Button.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.string,
  primary: React.PropTypes.bool,
};

export default Button;
