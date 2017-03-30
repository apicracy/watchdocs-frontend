import React from 'react';
import img404 from 'assets/404.jpg';
import Container from 'components/Container/Container';

const STYLES = {
  container: {
    textAlign: 'center',
    width: '100%',
  },
};

export default class NoMatch extends React.Component {

  render() {
    return (
      <Container>
        <div style={STYLES.container}>
          <h1>404 Page not found</h1>
          <img alt="404" src={img404} />
          <h3>{"The page you are looking for doesn't exist."}</h3>
        </div>
      </Container>
    );
  }
}
