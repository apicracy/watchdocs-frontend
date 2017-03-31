import React from 'react';
import styles from './RemoveApp.css';

const RemoveApp = () => (
  <div className={styles.container}>
    <h1>Remove application</h1>
    <p>If you wish to remove your application from our system please click button below</p>
    <button className={styles.button}>Remove</button>
  </div>
);

export default RemoveApp;
