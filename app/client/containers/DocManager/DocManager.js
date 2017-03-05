import React from 'react';

import AppBar from 'components/AppBar/AppBar';
import LayoutWrapper from 'components/LayoutWrapper/LayoutWrapper';
import Container from 'components/Container/Container'
import NavLink from 'components/NavigationLink/NavigationLink';
import Select from 'components/Select/Select';

class DocManager extends React.Component {

  render() {
    return (
      <LayoutWrapper>
        <AppBar secondary>
          <Container>
            <div>
              <Select options={['Project v1']} />
              <NavLink url="/docs" text="API documentation" />
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
