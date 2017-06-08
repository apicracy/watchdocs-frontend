import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

import styles from './NavigationLink.css';

@connect(store => ({
  projectSlug: store.projects.activeProject.slug,
}))
class NavigationLink extends React.Component {
  static propTypes = {
    url: React.PropTypes.string,
    text: React.PropTypes.string,
    index: React.PropTypes.bool,
    icon: React.PropTypes.node,
    projectSlug: React.PropTypes.string,
    id: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  }

  render() {
    const { url = '/', text, index, icon, projectSlug, disabled, id } = this.props;
    const classNames = [styles.navigationLink, (disabled && styles.disabled)];

    const props = {
      to: `/${projectSlug}${url}`,
      className: classNames.join(' '),
      activeClassName: styles.navigationLinkActive,
    };

    const inner = (
      <span className={styles.inner}>
        { icon } { text }
      </span>
    );

    if (index) {
      return <IndexLink {...props} id={id}>{ inner }</IndexLink>;
    }

    return <Link {...props} id={id}>{ inner }</Link>;
  }
}

export default NavigationLink;
