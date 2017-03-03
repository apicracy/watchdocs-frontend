import React from 'react'
import styles from './EndpointList.css'

import EndpointListGroup from './EndpointListGroup/EndpointListGroup'

const EndpointList = ({ endpoints }) => {
  return (
    <div className={styles.root}>
      <div className={styles.list}>
        { endpoints.map(group => <EndpointListGroup key={group.id} {...group} />)}
      </div>
    </div>
  )
}

export default EndpointList
