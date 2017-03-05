import React from 'react';
import 'font-awesome-webpack';

const Icon = ({ name }) => {
  const newName = `fa fa-' + ${name}`;

  return (<i className={newName} />);
};

export default Icon;

Icon.propTypes = {
  name: React.PropTypes.string,
};
