import React from 'react';

import styles from './UserMenu.css';

import Icon from 'components/Icon/Icon';

const UserMenu = ({ username }) => (
  <span className={styles.userMenuWrapper}>
    <Icon name="user-circle-o" />
    <span className={styles.username}>{ username }</span>
    <Icon name="chevron-down" />
  </span>
);

export default UserMenu;

UserMenu.propTypes = {
  username: React.PropTypes.string,
};
