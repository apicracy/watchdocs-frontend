import React from 'react';
import 'font-awesome-webpack';

const Icon = ({ name, size }) => {
  const newName = `fa fa-${name}`;
  let sizeClass = '';

  if (size === 'lg') {
    sizeClass = 'fa-lg';
  } else if (size) {
    sizeClass = `fa-${size}x`;
  }

  return <i className={`${newName} ${sizeClass}`} />;
};

Icon.propTypes = {
  name: React.PropTypes.string,
  size: React.PropTypes.oneOf(['lg', 2, 3, 4]),
};

export default Icon;
