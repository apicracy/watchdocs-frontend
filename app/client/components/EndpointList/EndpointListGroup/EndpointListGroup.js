import React from 'react'

import styles from './EndpointListGroup.css'

import EndpointListItem from '../EndpointListItem/EndpointListItem'
import Icon from 'components/Icon/Icon'
import { Link } from 'react-router'


const EndpointListGroup = ({ groupName, id, endpoints, groupPath, isActive }) => {
  return (
    <div className={styles.root}>
      <Link to={`/docs/${id}`} className={styles.link}>
        { isActive && <Icon name="folder-open-o" size="lg" /> }
        { !isActive && <Icon name="folder-o" size="lg" /> }
        <span className={styles.groupName}>{ groupName }</span>
      </Link>
      <div className={styles.endpoints}>
        { endpoints.map(endpoint => (
            <EndpointListItem
              key={endpoint.id}
              groupId={id}
              path={groupPath}
              {...endpoint} />
          ))
        }
      </div>
    </div>
  )
}

export default EndpointListGroup
