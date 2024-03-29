import React from 'react';
import styles from './UnauthorizedLayout.css';
import logo from '../../assets/watchdocslogo_white_full.png';
import { Link } from 'react-router';


const UnauthorizedLayout = (props, context) => {
  const currentPath = context.router.getCurrentLocation().pathname;
  const { title, description } = props;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/"><img src={logo} alt="Watchdocs.io" /></Link>
        </div>
        <div className={styles.inner}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {description && <div className={styles.description}>{description}</div>}
          {props.children}
        </div>
        <div className={styles.links}>
          {currentPath !== '/login' && <Link to="/login">Already have an account?</Link>}
          <a href="https://watchdocs.io/signup" target="_blank" rel="noopener noreferrer">Don&#39;t have an account yet?</a>
        </div>
      </div>
    </div>
  );
};

UnauthorizedLayout.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.bool]),
  title: React.PropTypes.string,
  description: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
};

UnauthorizedLayout.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default UnauthorizedLayout;
