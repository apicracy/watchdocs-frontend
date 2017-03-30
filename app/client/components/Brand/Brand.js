import React from 'react';
import styles from './Brand.css';
import img from 'assets/watchdocslogo_white.png';
import Link from 'components/NavigationLink/LinkWrapper';

const Brand = ({ href = '/', center }) => (
  <Link to={href} className={center ? styles.center : styles.brand}>
    <img className={styles.img} src={img} alt="Watchdocs" />
  </Link>
);

export default Brand;

Brand.propTypes = {
  href: React.PropTypes.string,
  center: React.PropTypes.bool,
};
