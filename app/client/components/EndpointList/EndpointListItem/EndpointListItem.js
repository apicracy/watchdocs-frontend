import React from 'react'
import { Link } from 'react-router'

import styles from './EndpointListItem.css'

const EndpointListItem = ({ path, method, params, id, groupId }) => {
  let paramsFormated = ''

  if (params && params.length > 0) {
    params = params.map(param => ':' + param)
    paramsFormated = '/(' + params.join(', ') + ')'
  }

  return (
    <Link to={`/docs/${groupId}/endpoint/${id}`} className={styles.root}>
      <span className={styles.method}>{ method }</span>
      <span className={styles.path}>{ path }{ paramsFormated }</span>
    </Link>
  )
}

export default EndpointListItem
