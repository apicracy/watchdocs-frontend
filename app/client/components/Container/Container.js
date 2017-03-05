import React from 'react';

import styles from './Container.css'

const Container = ({ children, center }) => {
  const topStyle = center ? styles.center : styles.root

  return (
    <div className={topStyle}>
      { children }
    </div>
  )
}

export default Container
