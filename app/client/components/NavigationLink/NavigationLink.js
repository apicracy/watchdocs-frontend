import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

import styles from './NavigationLink.css';

@connect(store => ({
  projectName: store.projects.activeProject.name,
}))
class NavigationLink extends React.Component {
  static propTypes = {
    url: React.PropTypes.string,
    text: React.PropTypes.string,
    index: React.PropTypes.bool,
    icon: React.PropTypes.node,
    projectName: React.PropTypes.string,
  }

  render() {
    const { url = '/', text, index, icon, projectName } = this.props;

    const props = {
      to: `/${projectName}${url}`,
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
  }
}

export default NavigationLink;
