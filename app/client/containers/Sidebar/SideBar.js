import React from 'react'
import { connect } from 'react-redux'
import styles from './SideBar.css'

import EndpointList from 'components/EndpointList/EndpointList'

@connect(store => ({
  endpoints: store.endpoints
}))
class SideBar extends React.Component {

  render() {
    return (
      <aside className={styles.sideBar}>
        <EndpointList endpoints={this.props.endpoints} />
      </aside>
    )
  }
}


export default SideBar
