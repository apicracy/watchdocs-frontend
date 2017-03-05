import React from 'react';

import styles from './Container.css';

const Container = ({ children }) => (
  <div className={styles.root}>
    { children }
  </div>
);

export default Container;

Container.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
};
