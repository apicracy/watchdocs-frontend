import React from 'react';

import styles from './SideBar.css';

const SideBar = ({ children }) => (
  <aside className={styles.sideBar}>
    { children }
  </aside>
);

export default SideBar;

SideBar.propTypes = {
  children: React.PropTypes.object,
};
