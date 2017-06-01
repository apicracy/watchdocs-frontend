import React from 'react';

import styles from '../Tabs.css';

const TabLink = ({ title, active, onClick, id }) => {
  const topStyle = active ? styles.active : styles.link;
  const clickHandler = () => { onClick(id); };

  return <button onClick={clickHandler} className={topStyle}>{title}</button>;
};

TabLink.propTypes = {
  title: React.PropTypes.string,
  active: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
};

export default TabLink;
