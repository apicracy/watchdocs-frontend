import React from 'react';
import styles from './RFTextArea.css';

const errorMessage = message => (
  <div className={styles.error}>
    { message }
  </div>
);

const RFTextArea = ({ input, meta, placeholder, rows }) => {
  const { touched, error } = meta;
  const showError = touched && error;

  return (
    <div className={styles.root}>
      <textarea
        {...input}
        placeholder={placeholder}
        rows={rows}
        className={styles.input}
      />
      { showError && errorMessage(error) }
    </div>
  );
};

RFTextArea.defaultProps = {
  placeholder: '',
  rows: 3,
};

RFTextArea.propTypes = {
  placeholder: React.PropTypes.string,
  input: React.PropTypes.object,
  meta: React.PropTypes.object,
  rows: React.PropTypes.integer,
};

export default RFTextArea;
