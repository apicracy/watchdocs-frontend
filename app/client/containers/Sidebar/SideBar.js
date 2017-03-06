import React from 'react'
import { connect } from 'react-redux'
import styles from './SideBar.css'

import EndpointList from 'components/EndpointList/EndpointList'

@connect(store => ({
  endpoints: store.endpoints
}))
class SideBar extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    endpoints: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  render() {
    const { group_id, endpoint_id } = this.props.params

    return (
      <aside className={styles.sideBar}>
        <EndpointList endpoints={this.props.endpoints} activeGroup={group_id} selected={endpoint_id} />
      </aside>
    )
  }
}


export default SideBar
