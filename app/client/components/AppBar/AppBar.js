import React from 'react';
import styles from './AppBar.css';

const AppBar = ({ children }) => {
  const classes = styles.appBar;

  return (
    <nav className={classes}>
      { children }
    </nav>
  );
};

export default AppBar;

AppBar.propTypes = {
  children: React.PropTypes.object,
};
