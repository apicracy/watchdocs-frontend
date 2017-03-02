import React from 'react';

import styles from './SideBar.css'

class SideBar extends React.Component {

  render() {
    return (
      <aside className={styles.sideBar}>
        <div>Sidebar</div>
      </aside>
    )
  }
}

export default SideBar
