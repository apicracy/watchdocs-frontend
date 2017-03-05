import React from 'react';
import { Link, IndexLink } from 'react-router';

import styles from './NavigationLink.css';

const NavigationLink = ({ url = '/', text }) => {
  let component;

  const props = {
    to: url,
    className: styles.navigationLink,
    activeClassName: styles.navigationLinkActive,
  };

  if (props.to === '/') {
    component = <IndexLink {...props}>{ text }</IndexLink>;
  } else {
    component = <Link {...props}>{ text }</Link>;
  }

  return component;
};

export default NavigationLink;

NavigationLink.propTypes = {
  url: React.PropTypes.string,
  text: React.PropTypes.string,
};
