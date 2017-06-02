import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

@connect(store => ({
  projectSlug: store.projects.activeProject.slug,
}))
class LinkWrapper extends React.Component {
  static propTypes = {
    projectSlug: React.PropTypes.string,
    to: React.PropTypes.string,
  }

  render() {
    const props = {
      ...this.props,
      to: `/${this.props.projectSlug}${this.props.to}`,
      dispatch: null,
      projectSlug: null,
    };

    return (
      <Link
        to={props.to}
        className={props.className}
        onClick={props.onClick}
      > { props.children } </Link>
    );
  }
}

export default LinkWrapper;
