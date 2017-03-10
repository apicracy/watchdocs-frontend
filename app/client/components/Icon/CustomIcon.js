import React from 'react';

import styles from './CustomIcon.css';

const CustomIcon = ({ name, ext, size, color }) => {
  const topStyle = size ? styles[size] : styles.icon;
  /* eslint-disable */
  const icon = require(`assets/icons/${name}.${ext}`);
  /* eslint-enable */

  if (ext === 'svg') {
    /* eslint-disable react/no-danger */
    return (
      <svg
        style={{ stroke: color }}
        className={topStyle}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
    );
  }

  return <img src={icon} alt={name} className={topStyle} />;
};

CustomIcon.propTypes = {
  name: React.PropTypes.string.isRequired,
  ext: React.PropTypes.oneOf(['png', 'svg']),
  size: React.PropTypes.oneOf(['lg', 'x2', 'x3']),
  color: React.PropTypes.string,
};

CustomIcon.defaultProps = {
  ext: 'png',
  size: false,
  color: 'black',
};

export default CustomIcon;
