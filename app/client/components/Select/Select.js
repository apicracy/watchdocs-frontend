import React from 'react';
import styles from './Select.css';
import Icon from 'components/Icon/Icon';

/* eslint no-unused-vars: 0 */
// TODO: in development
const Select = ({ options, onSelect }) => (
  <span className={styles.selectWrapper}>
    <span className={styles.selectedOption}>{ options[0] }</span>
    <Icon name="chevron-down" />
  </span>
);

export default Select;

Select.propTypes = {
  options: React.PropTypes.array,
  onSelect: React.PropTypes.bool,
};
