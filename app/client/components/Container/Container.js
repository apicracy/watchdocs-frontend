import React from 'react';

import styles from './Container.css';

const Container = ({ children, center }) => {
  const topStyle = center ? styles.center : styles.root;

  return (
    <div className={topStyle}>
      { children }
    </div>
  );
};

export default Container;

Container.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
  center: React.PropTypes.bool,
};
