import React from 'react';
import styles from './BackLink.css';
import Icon from 'components/Icon/Icon';

const BackLink = ({ onClick = () => {}, children }) => (
  <button onClick={onClick} className={styles.container}>
    <Icon name="arrow-left" /> Back to {children}
  </button>
);

export default BackLink;

BackLink.propTypes = {
  onClick: React.PropTypes.func,
  children: React.PropTypes.object,
};
