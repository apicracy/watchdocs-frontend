import React from 'react';
import styles from './RFTextInput.css';

const errorMessage = message => (
  <div className={styles.error}>
    { message }
  </div>
);

const RFTextInput = ({ input, type, placeholder, iconRight,
  variant, variants, meta: { touched, error }, autofocus }) => {
  const variantStyles = variants.map(v => styles[v]);
  const rootClasses = [
    styles.wrapper,
    ...variantStyles,
  ].join(' ');

  const showError = touched && error;

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
      <div className={showError ? variantErrorStyle : variantStyle}>
        {autofocus}
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          className={variantInputStyle}
          autoFocus={autofocus}
        />
        <span className={styles.addon}>{ iconRight }</span>
      </div>
      { showError && errorMessage(error) }
    </div>
  );
};


RFTextInput.propTypes = {
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string,
  variant: React.PropTypes.string,
  iconRight: React.PropTypes.node,
  variants: React.PropTypes.array,
  input: React.PropTypes.object,
  meta: React.PropTypes.object,
  autofocus: React.PropTypes.bool,
};

RFTextInput.defaultProps = {
  variants: [],
  placeholder: '',
  type: 'text',
};

export default RFTextInput;
