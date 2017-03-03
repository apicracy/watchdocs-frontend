import React from 'react'
import styles from './Select.css'
import Icon from 'components/Icon/Icon'

const Select = ({ options, onSelect }) => {
  return (
    <span className={styles.selectWrapper}>
      <span className={styles.selectedOption}>{ options[0] }</span> {/* Mock data. TODO get it from redux */}
      <Icon name="chevron-down" />
    </span>
  )
}

export default Select
