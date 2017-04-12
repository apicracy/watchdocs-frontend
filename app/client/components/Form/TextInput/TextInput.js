import React from 'react';
import styles from './TextInput.css';

const TextInput = ({ placeholder, value, defaultValue, onChange, iconRight,
  validationErrorMsg, validation, variant }) => {
  const isValid = (value.replace(validation, '').length === 0);
  const variantStyle = (variant === 'white') ? styles.rootWhite : styles.root;
  const variantErrorStyle = (variant === 'white') ? styles.rootErrorWhite : styles.rootError;
  const variantInputStyle = (variant === 'white') ? styles.inputWhite : styles.input;

  return (
    <div className={styles.wrapper}>
      <div className={isValid ? variantStyle : variantErrorStyle}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className={variantInputStyle}
          value={value || undefined}
          defaultValue={defaultValue}
        />
        <span className={styles.addon}>{ iconRight }</span>
      </div>
      { !isValid && <div className={styles.error}>{ validationErrorMsg }</div> }
    </div>
  );
};


TextInput.propTypes = {
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  variant: React.PropTypes.string,
  iconRight: React.PropTypes.node,
  onChange: React.PropTypes.func,
  validation: React.PropTypes.object,
  validationErrorMsg: React.PropTypes.string,
};

TextInput.defaultProps = {
  placeholder: '',
  value: '',
  onChange: () => {},
  validation: new RegExp(/./g),
};

export default TextInput;
