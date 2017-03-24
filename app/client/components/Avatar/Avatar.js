import React from 'react';

import styles from './Avatar.css';

const Avatar = ({ src, circle }) => {
  const topStyle = circle ? styles.circle : styles.root;
  /* eslint-disable */
  const img = require(`assets/avatars/${src}`);
  /* eslint-enable */

  return <img src={img} alt={src} className={topStyle} />;
};

Avatar.propTypes = {
  src: React.PropTypes.string,
  circle: React.PropTypes.bool,
};

Avatar.defaultProps = {};

export default Avatar;
