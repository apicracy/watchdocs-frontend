import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { urlFormatProjectName } from 'services/projects';

@connect(store => ({
  projectName: urlFormatProjectName(store.projects.activeProject.name),
}))
class LinkWrapper extends React.Component {
  static propTypes = {
    projectName: React.PropTypes.string,
    to: React.PropTypes.string,
  }

  render() {
    const props = {
      ...this.props,
      to: `/${this.props.projectName}${this.props.to}`,
      dispatch: null,
      projectName: null,
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
