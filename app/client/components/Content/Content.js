import React from 'react';

import styles from './Content.css';

const Content = ({ children, justify }) => {
  let classes = styles.content;

  if (justify) {
    classes = styles.justify;
  }

  return (
    <section className={classes}>
      <div className={styles.contentWrapper}>
        { children }
      </div>
    </section>
  );
};

export default Content;

Content.propTypes = {
  children: React.PropTypes.node,
  justify: React.PropTypes.bool,
};
