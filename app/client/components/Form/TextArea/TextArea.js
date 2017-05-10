import React from 'react';
import styles from './TextArea.css';

const TextArea = ({ placeholder, value, onChange, rows, name }) => (
  <div className={styles.root}>
    <textarea
      rows={rows}
      placeholder={placeholder}
      onChange={onChange}
      className={styles.input}
      value={value}
      name={name}
    />
  </div>
);


TextArea.propTypes = {
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  rows: React.PropTypes.number,
  onChange: React.PropTypes.func,
  name: React.PropTypes.string,
};

TextArea.defaultProps = {
  placeholder: '',
  rows: 3,
  value: '',
  onChange: () => {},
  name: '',
};

export default TextArea;
