import React from 'react'
import styles from './Brand.css'

import { Link } from 'react-router'

const Brand = ({ href = '/' }) => {
  return (
    <Link to={href} className={styles.brand}>Tutapi</Link>
  )
}

export default Brand
