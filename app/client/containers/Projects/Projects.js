import React from 'react';
import styles from './Projects.css';
import Container from 'components/Container/Container';
import LayoutWrapper from 'components/LayoutWrapper/LayoutWrapper';

const Projects = () => (
  <LayoutWrapper>
    <Container center>
      <div className={styles.root}>Loading...</div>
    </Container>
  </LayoutWrapper>
);

export default Projects;
