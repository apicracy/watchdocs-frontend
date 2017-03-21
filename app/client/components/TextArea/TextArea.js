import React from 'react';
import styles from './TextArea.css';

const TextArea = ({ placeholder, value, onChange, rows }) => (
  <div className={styles.root}>
    <textarea
      rows={rows}
      placeholder={placeholder}
      onChange={onChange}
      className={styles.input}
      value={value}
    />
  </div>
);


TextArea.propTypes = {
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  rows: React.PropTypes.number,
  onChange: React.PropTypes.func,
};

TextArea.defaultProps = {
  placeholder: '',
  rows: 3,
  value: '',
  onChange: () => {},
};

export default TextArea;
