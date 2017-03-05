import React from 'react';

import styles from './LayoutWrapper.css'

/*
 * Wrap layput so it will take 100% height
 */
const LayoutWrapper = ({ children, center }) => {

  return (
    <div className={styles.root}>
      { children }
    </div>
  )
}

export default LayoutWrapper
