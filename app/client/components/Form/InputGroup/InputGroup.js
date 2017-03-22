import React from 'react';
import styles from './InputGroup.css';

const InputGroup = ({ title, description, children }) => (
  <section className={styles.root}>
    <h5 className={styles.title}>{ title }</h5>
    <p className={styles.description}>{ description }</p>
    <div className={styles.inputs}>
      { children }
    </div>
  </section>
);

InputGroup.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default InputGroup;
