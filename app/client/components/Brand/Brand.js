import React from 'react';
import styles from './Brand.css';
import img from 'assets/watchdocslogo_white.png';

const Brand = () => (
  <img className={styles.img} src={img} alt="Watchdocs" />
);

export default Brand;
