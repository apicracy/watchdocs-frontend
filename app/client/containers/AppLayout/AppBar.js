import React from 'react';
import styles from './AppBar.css';

import Brand from 'components/Brand/Brand';
import NavLink from 'components/NavigationLink/NavigationLink';
import UserMenu from 'components/UserMenu/UserMenu';
import Select from 'components/Select/Select';

class AppBar extends React.Component {

  render() {
    return (
      <nav className={styles.appBar}>
        <div className={styles.appBar__left}>
          <Brand />
          <div className={styles.appBar__selects}>
            <Select options={['Project']} />
            <Select options={['v1']} />
          </div>
        </div>
        <div className={styles.appBar__right}>
          <NavLink url="/" text="API documentation" />
          <NavLink url="/static" text="Static pages" />
          <NavLink url="/settings" text="Settings" />
          <UserMenu username="WatchDocs User" />
        </div>
      </nav>
    )
  }
}

export default AppBar
