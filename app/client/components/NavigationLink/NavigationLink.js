import React from 'react';
import { Link, IndexLink } from 'react-router';

import styles from './NavigationLink.css';

const NavigationLink = ({ url = '/', text, index, icon }) => {
  const props = {
    to: url,
    className: styles.navigationLink,
    activeClassName: styles.navigationLinkActive,
  };

  const inner = (
    <span className={styles.inner}>
      { icon } { text }
    </span>
  );

  if (index) {
    return <IndexLink {...props}>{ inner }</IndexLink>;
  }

  return <Link {...props}>{ inner }</Link>;
};

NavigationLink.propTypes = {
  url: React.PropTypes.string,
  text: React.PropTypes.string,
  index: React.PropTypes.bool,
  icon: React.PropTypes.node,
};

export default NavigationLink;
