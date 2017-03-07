import React from 'react';
import styles from './Tabs.css';

const TabLink = ({ title, active }) => {
  const topStyle = active ? styles.active : styles.link;

  return <span className={topStyle}>{title}</span>;
};

TabLink.propTypes = {
  title: React.PropTypes.string,
  active: React.PropTypes.bool,
};

const Tabs = ({ data }) => (
  <div className={styles.root}>
    { data.map((v, i) => <TabLink key={i} active={(i === 0)} title={v.title} />)}
  </div>
);

Tabs.propTypes = {
  data: React.PropTypes.array,
};

export default Tabs;
