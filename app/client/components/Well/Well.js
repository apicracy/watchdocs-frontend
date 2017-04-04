import React from 'react';
import styles from './Well.css';

const Well = ({ type, variants, children }) => {
  const classes = [
    styles.root,
    ...variants.map(s => styles[s]),
  ].join(' ');

  return React.createElement(type,
    {
      className: classes,
    },
    children,
  );
};

Well.propTypes = {
  type: React.PropTypes.oneOf([
    'div', 'span',
  ]).isRequired,
  variants: React.PropTypes.array,
  children: React.PropTypes.node,
};

Well.defaultProps = {
  type: 'div',
  variants: [],
};

export default Well;
