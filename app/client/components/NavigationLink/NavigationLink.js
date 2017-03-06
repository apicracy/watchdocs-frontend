import React from 'react';
import { Link, IndexLink } from 'react-router';

import styles from './NavigationLink.css';

const NavigationLink = ({ url = '/', text, index }) => {
  const props = {
    to: url,
    className: styles.navigationLink,
    activeClassName: styles.navigationLinkActive,
  };

  if (index) {
    return <IndexLink {...props}>{ text }</IndexLink>;
  }

  return <Link {...props}>{ text }</Link>;
};

NavigationLink.propTypes = {
  url: React.PropTypes.string,
  text: React.PropTypes.string,
  index: React.PropTypes.bool,
};

export default NavigationLink;
