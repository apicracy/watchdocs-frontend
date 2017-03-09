import React from 'react';

import styles from './CustomIcon.css';


const CustomIcon = ({ name }) => {
  /* eslint-disable */
  const icon = require(`assets/icons/${name}.png`);
  /* eslint-enable */

  return <img src={`${icon}`} alt={name} className={styles.icon} />;
};

CustomIcon.propTypes = {
  name: React.PropTypes.string,
};

export default CustomIcon;
