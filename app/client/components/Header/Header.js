import React from 'react';
import styles from './Header.css';

const Header = ({ title, children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.actions}>
        {children}
      </div>
    </div>
  );
};

Header.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]),
  title: React.PropTypes.string,
};

export default Header;
