import React from 'react';

import AppBar from 'components/AppBar/AppBar';
import LayoutWrapper from 'components/LayoutWrapper/LayoutWrapper';
import Container from 'components/Container/Container'
import NavLink from 'components/NavigationLink/NavigationLink';
import Select from 'components/Select/Select';

class DocManager extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    params: React.PropTypes.object // supplied by react-router
  }

  render() {
    return (
      <LayoutWrapper>
        <AppBar secondary>
          <Container>
            <div>
              <Select options={['Project v1']} />
              {/* To keep linkg highlighted when viewing docs */}
              <NavLink url="/docs" index={!this.props.params.group_id} text="API documentation" />
              <NavLink url="/docs/wiki" text="Wiki pages" />
              <NavLink url="/docs/settings" text="Settings" />
            </div>
          </Container>
        </AppBar>
        { this.props.children }
      </LayoutWrapper>
    )
  }
}

export default DocManager;
