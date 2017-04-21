import React from 'react';

import styles from './UserMenu.css';

import CustomIcon from 'components/Icon/CustomIcon';
import Avatar from 'components/Avatar/Avatar';

class UserMenu extends React.Component {
  static propTypes = {
    onLogout: React.PropTypes.func,
  }

  onClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentWillMount = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const {
      onLogout,
    } = this.props;

    return (
      <div>
        <button onClick={this.onClick} className={styles.userMenuWrapper}>
          <Avatar circle src="watchdocs-user.jpg" />
          <CustomIcon name="arrow-down" size="xs" />
        </button>
        { this.state.isOpen && (
          /* eslint jsx-a11y/no-static-element-interactions: 0 */
          <div onClick={this.onClick} className={styles.userMenu}>
            <button className={styles.option}>User Setting</button>
            <button onClick={onLogout} className={styles.option}>Log Out</button>
          </div>
        )
      }
      </div>
    );
  }
}

export default UserMenu;
