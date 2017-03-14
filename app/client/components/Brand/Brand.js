import React from 'react';
import styles from './Brand.css';
import img from 'assets/watchdocslogo_white.png';
import { Link } from 'react-router';

const Brand = ({ href = '/' }) => (
  <Link to={href} className={styles.brand}>
    <img className={styles.img} src={img} alt="Watchdocs" />
  </Link>
);

export default Brand;

Brand.propTypes = {
  href: React.PropTypes.string,
};
