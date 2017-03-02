import React from 'react';
import styles from './AppBar.css';

import Brand from 'components/Brand/Brand';
import NavLink from 'components/NavigationLink/NavigationLink';
import UserMenu from 'components/UserMenu/UserMenu';

class AppBar extends React.Component {

  render() {
    return (
      <nav className={styles.appBar}>
        <div className={styles.appBar__left}>
          <Brand />
        </div>
        <div className={styles.appBar__right}>
          <NavLink url="/" text="API documentation" />
          <NavLink url="/static" text="Static pages" />
          <NavLink url="/settings" text="Settings" />
          <UserMenu username="Tutapi User" />
        </div>
      </nav>
    )
  }
}

export default AppBar
