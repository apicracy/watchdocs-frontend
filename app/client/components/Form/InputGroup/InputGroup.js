import React from 'react';
import styles from './InputGroup.css';

const InputGroup = ({ title, description, children, variants }) => {
  const variantStyles = variants.map(v => styles[v]);
  const inputGroupStyle = [
    styles.root,
    ...variantStyles,
  ].join(' ');

  return (
    <section className={inputGroupStyle}>
      <h5 className={styles.title}>{ title }</h5>
      <p className={styles.description}>{ description }</p>
      <div className={styles.inputs}>
        { children }
      </div>
    </section>
  );
};

InputGroup.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  children: React.PropTypes.node,
  variants: React.PropTypes.array,
};

InputGroup.defaultProps = {
  variants: [],
};

export default InputGroup;
