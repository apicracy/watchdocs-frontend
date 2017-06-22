import React from 'react';

import styles from './Content.css';

const Content = ({ children }) => (
  <section className={styles.content}>
    { children }
  </section>
);

export default Content;

Content.propTypes = {
  children: React.PropTypes.node,
};
