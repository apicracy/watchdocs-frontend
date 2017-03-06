import React from 'react';
import styles from './AppBar.css';

const AppBar = ({ children, secondary }) => {
  let classes = styles.appBar;

  if (secondary) {
    classes = styles.secondary;
  }

  return (
    <nav className={classes}>
      { children }
    </nav>
  );
};

export default AppBar;

AppBar.propTypes = {
  children: React.PropTypes.object,
  secondary: React.PropTypes.bool,
};
