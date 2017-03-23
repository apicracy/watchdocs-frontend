import React from 'react';

import styles from './UserMenu.css';

import CustomIcon from 'components/Icon/CustomIcon';
import Avatar from 'components/Avatar/Avatar';

const UserMenu = () => (
  <span className={styles.userMenuWrapper}>
    <Avatar circle src="watchdocs-user.jpg" />
    <CustomIcon name="arrow-down" size="xs" />
  </span>
);

export default UserMenu;

UserMenu.propTypes = {
  username: React.PropTypes.string,
};
