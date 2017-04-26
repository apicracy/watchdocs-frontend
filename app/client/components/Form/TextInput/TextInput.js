import React from 'react';
import styles from './TextInput.css';

const TextInput = ({ placeholder, value, defaultValue, onChange, iconRight,
  validationErrorMsg, validation, variant, variants, type }) => {
  const variantStyles = variants.map(v => styles[v]);
  const rootClasses = [
    styles.wrapper,
    ...variantStyles,
  ].join(' ');

  let isValid = true;
  if (value) {
    isValid = (value.replace(validation, '').length === 0);
  }

  let variantStyle = styles.root;
  let variantErrorStyle = styles.rootError;
  let variantInputStyle = styles.input;

  switch (variant) {
    case 'white':
      variantStyle = styles.rootWhite;
      variantErrorStyle = styles.rootErrorWhite;
      variantInputStyle = styles.inputWhite;
      break;
    case 'no-border':
      variantStyle = styles.rootNoBorder;
      break;
    default:
      break;
  }

  return (
    <div className={rootClasses}>
      <div className={isValid ? variantStyle : variantErrorStyle}>
        <input
          type={type}
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
  type: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  variant: React.PropTypes.string,
  iconRight: React.PropTypes.node,
  onChange: React.PropTypes.func,
  validation: React.PropTypes.object,
  validationErrorMsg: React.PropTypes.string,
  variants: React.PropTypes.array,
};

TextInput.defaultProps = {
  variants: [],
  placeholder: '',
  type: 'text',
  value: '',
  onChange: () => {},
  validation: new RegExp(/./g),
};

export default TextInput;
