import React from 'react'
import styles from './EndpointList.css'

import EndpointListGroup from './EndpointListGroup/EndpointListGroup'

const EndpointList = (props) => {
  const { endpoints, activeGroup } = props;

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {
          /* TODO not sure if id will be int or string */
          endpoints.map(group => (
            <EndpointListGroup
              isActive={(`${group.id}` === activeGroup)}
              key={group.id}
              {...group} />
          ))
        }
      </div>
    </div>
  )
}

export default EndpointList
