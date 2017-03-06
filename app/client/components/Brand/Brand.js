import React from 'react';
import styles from './Brand.css';

import { Link } from 'react-router';

const Brand = ({ href = '/' }) => (
  <Link to={href} className={styles.brand}>WatchDocs</Link>
);

export default Brand;

Brand.propTypes = {
  href: React.PropTypes.string,
};
