import React from 'react';
import styles from './Select.css';
import CustomIcon from 'components/Icon/CustomIcon';

/* eslint no-unused-vars: 0 */
// TODO: in development
const Select = ({ options, onSelect }) => (
  <span className={styles.selectWrapper}>
    <span className={styles.selectedOption}>{ options[0] }</span>
    <CustomIcon ext="svg" color="white" size="sm" name="arrow-down" />
  </span>
);

export default Select;

Select.propTypes = {
  options: React.PropTypes.array,
  onSelect: React.PropTypes.bool,
};

Select.defaultProps = {
  options: [
    'Option 1'
  ]
}
