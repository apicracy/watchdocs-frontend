import React from 'react';

import styles from './LayoutWrapper.css';

/*
 * Wrap layput so it will take 100% height
 */
const LayoutWrapper = ({ children }) => (
  <div className={styles.root}>
    { children }
  </div>
);

LayoutWrapper.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default LayoutWrapper;
