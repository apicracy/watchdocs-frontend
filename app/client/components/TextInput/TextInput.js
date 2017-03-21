import React from 'react';
import styles from './TextInput.css';

const TextInput = ({ placeholder, value, onChange, iconRight, validationErrorMsg, validation }) => {
  const isValid = (value.replace(validation, '').length === 0);

  return (
    <div className={styles.wrapper}>
      <div className={isValid ? styles.root : styles.rootError}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className={styles.input}
          value={value}
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
  iconRight: React.PropTypes.node,
  onChange: React.PropTypes.func,
};

TextInput.defaultProps = {
  placeholder: '',
  value: '',
  onChange: () => {},
  validation: new RegExp(/./g)
};

export default TextInput;
