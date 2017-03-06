import React from 'react'
import { Link, IndexLink } from 'react-router'

import styles from './NavigationLink.css'

const NavigationLink = ({url = "/", text, index}) => {
  let component;
  
  const props = {
    to: url,
    className: styles.navigationLink,
    activeClassName: styles.navigationLinkActive
  }

  if(index) {
    component = <IndexLink {...props}>{ text }</IndexLink>
  } else {
    component = <Link {...props}>{ text }</Link>
  }

  return component;
}

export default NavigationLink
