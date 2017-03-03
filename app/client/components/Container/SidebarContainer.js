import React from 'react';

import styles from './SidebarContainer.css'

const SidebarContainer = ({ children }) => {
  return (
    <div className={styles.root}>
      { children }
    </div>
  )
}

export default SidebarContainer
