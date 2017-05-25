import React from 'react';
import styles from './UnauthorizedLayout.css';
import logo from '../../assets/watchdocslogo_white_full.png';

const UnauthorizedLayout = (props, context) => {
  const currentPath = context.router.getCurrentLocation().pathname;
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Watchdocs.io" />
        </div>
        <div className={styles.inner}>
          {props.children}
        </div>
        <div className={styles.links}>
          {currentPath !== '/login' && <a href="/login">Already have an account?</a>}
          {currentPath !== '/signup' && <a href="/signup">Do not yet have an account?</a>}
        </div>
      </div>
    </div>
  );
};

UnauthorizedLayout.propTypes = {
  children: React.PropTypes.object,
};

UnauthorizedLayout.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default UnauthorizedLayout;
