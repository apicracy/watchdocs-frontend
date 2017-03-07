import React from 'react';
import styles from './TextInput.css';

const TextInput = ({ placeholder = '', value = '', onChange, iconRight }) => (
  <div className={styles.root}>
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className={styles.input}
      value={value}
    />
    { iconRight }
  </div>
);


TextInput.propTypes = {
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  iconRight: React.PropTypes.node,
  onChange: React.PropTypes.func,
};

export default TextInput;
