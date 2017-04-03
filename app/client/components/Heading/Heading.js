import React from 'react';
import styles from './Heading.css';

const Heading = ({ type, variants, children}) => {
  const classes = [
    styles[type],
    ...variants.map(s => styles[s]),
  ].join(' ');

  return React.createElement(type,
    {
      className: classes,
    },
    children
  );
};

Heading.propTypes = {
  type: React.PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5'
  ]).isRequired,
  variants: React.PropTypes.array,
  children: React.PropTypes.node,
};

Heading.defaultProps ={
  type: 'h3',
  variants: [],
};

export default Heading;
