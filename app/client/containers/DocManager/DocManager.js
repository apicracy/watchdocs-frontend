import React from 'react';
import { connect } from 'react-redux';

import { fetchProjects, setActiveProject } from 'services/projects';

import AppBar from 'components/AppBar/AppBar';
import LayoutWrapper from 'components/LayoutWrapper/LayoutWrapper';
import Container from 'components/Container/Container';
import NavLink from 'components/NavigationLink/NavigationLink';
import Select from 'components/Select/Select';

@connect(store => ({
  projects: store.projects,
}))
class DocManager extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchProjects());
  }

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
    params: React.PropTypes.object, // supplied by react-router
    dispatch: React.PropTypes.func,
    projects: React.PropTypes.array,
  }

  switchProject = (id) => {
    this.props.dispatch(setActiveProject(id));
  }

  render() {
    return (
      <LayoutWrapper>
        <AppBar secondary>
          <Container>
            <div>
              <Select options={this.props.projects} onSelect={this.switchProject} />
              <NavLink url="/docs" index={!this.props.params.group_id} text="API documentation" />
              <NavLink url="/docs/wiki" text="Wiki pages" />
              <NavLink url="/docs/settings" text="Settings" />
            </div>
          </Container>
        </AppBar>
        { this.props.children }
      </LayoutWrapper>
    );
  }
}

export default DocManager;
