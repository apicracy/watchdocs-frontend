import React from 'react';
import styles from './Button.css';

const Button = ({ onClick, children, icon, variants, disabled }) => {
  // to apply many variants to one button
  const variantStyles = variants.map(v => styles[v]);
  const buttonStyle = [
    styles.root,
    ...variantStyles,
  ].join(' ');

  return (
    <button
      onClick={onClick}
      className={buttonStyle}
      disabled={disabled}
    >
      { children } { icon && <span className={styles.icon}>{ icon }</span> }
    </button>
  );
};

Button.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.node,
  ]),
  disabled: React.PropTypes.bool,
  icon: React.PropTypes.node,
  variants: React.PropTypes.array,
};

Button.defaultProps = {
  onClick: () => {},
  icon: '',
  disabled: false,
  variants: [],
};

export default Button;
