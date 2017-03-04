import React from 'react'
import { Link } from 'react-router'
import Icon from 'components/Icon/Icon'

import styles from './EndpointListItem.css'

const EndpointListItem = ({ path, method, params, id, groupId, isSelected }) => {
  let paramsFormated = ''
  const topStyle = isSelected ? styles.selected : styles.root

  if (params && params.length > 0) {
    params = params.map(param => ':' + param)
    paramsFormated = '/(' + params.join(', ') + ')'
  }

  return (
    <Link to={`/docs/${groupId}/endpoint/${id}`} className={topStyle}>
      <span className={styles.data}>
        <span className={styles.method}>{ method }</span>
        <span className={styles.path}>{ path }{ paramsFormated }</span>
      </span>
      { isSelected && <Icon name="ellipsis-h" /> }
    </Link>
  )
}

export default EndpointListItem
