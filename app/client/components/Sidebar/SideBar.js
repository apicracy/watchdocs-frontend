import React from 'react';

import styles from './SideBar.css'

const SideBar = ({ children }) => {
  return (
    <aside className={styles.sideBar}>
      { children }
    </aside>
  )
}

export default SideBar
