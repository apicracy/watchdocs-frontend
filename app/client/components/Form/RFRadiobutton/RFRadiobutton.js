import React, { PropTypes } from 'react';
import styles from './RFRadiobutton.css';
import CustomIcon from 'components/Icon/CustomIcon';

RFRadiobutton.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
     label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
   })).isRequired,
  meta: PropTypes.object,
};

const errorMessage = message => (
  <div className={styles.error}>
    { message }
  </div>
);

export default function RFRadiobutton({ input, options, meta }) {
  const { name, value, onBlur, onChange, onFocus } = input;
  const { touched, error } = meta;
  const showError = touched && error;

  const optionsList = options.map(option => (
    <div className={styles.option} key={option.value}>
      <div className={styles.icon} onClick={() => onChange(option.value)}>
        <CustomIcon name={option.value === value ? 'radio-checked' : 'radio-unchecked'} size="lg" />
      </div>
      <div className={styles.label}>
        <div className={styles.clickLabel} onClick={() => onChange(option.value)}>
          { option.label }
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.wrapper}>
      { optionsList }
      { showError && errorMessage(error) }
    </div>
  );
}
