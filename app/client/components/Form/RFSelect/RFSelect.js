import React, { PropTypes } from 'react';
import Select from 'react-select';
import styles from './RFSelect.css';

RFSelect.defaultProps = {
  multi: false,
};

RFSelect.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
  meta: PropTypes.object,
};

const errorMessage = message => (
  <div className={styles.error}>
    { message }
  </div>
);

export default function RFSelect({ input, options, multi, meta }) {
  const { name, value, onBlur, onChange, onFocus } = input;
  const { touched, error } = meta;
  const transformedValue = transformValue(value, options, multi);
  const showError = touched && error;

  return (
    <div className={styles.wrapper}>
      <Select
        valueKey="value"
        name={name}
        value={transformedValue}
        multi={multi}
        options={options}
        onChange={multi
          ? multiChangeHandler(onChange)
          : singleChangeHandler(onChange)
        }
        onBlur={() => onBlur(value)}
        onFocus={onFocus}
        className={showError ? 'Select--invalid' : ''}
      />
      { showError && errorMessage(error) }
    </div>
  );
}

/**
 * onChange from Redux Form Field has to be called explicity.
 */
function singleChangeHandler(func) {
  return (value) => {
    func(value ? value.value : '');
  };
}

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
function multiChangeHandler(func) {
  return (values) => {
    func(values.map(value => value.value));
  };
}

/**
 * For single select, Redux Form keeps the value as a string, while React Select
 * wants the value in the form { value: "grape", label: "Grape" }
 *
 * * For multi select, Redux Form keeps the value as array of strings, while React Select
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
function transformValue(value, options, multi) {
  if (multi && typeof value === 'string') return [];

  const filteredOptions = options.filter(option => (
    multi
      ? value.indexOf(option.value) !== -1
      : option.value === value
  ));

  return multi ? filteredOptions : filteredOptions[0];
}
