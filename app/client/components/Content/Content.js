import React from 'react';

import styles from './Content.css';

const Content = ({ children, justify }) => {
  let classes = styles.content;

  if(justify) {
    classes = styles.justify;
  }

  return (
    <section className={classes}>
      { children }
    </section>
  )
}

export default Content
