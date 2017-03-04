import React from 'react'

import styles from './EndpointListGroup.css'

import EndpointListItem from '../EndpointListItem/EndpointListItem'
import Icon from 'components/Icon/Icon'
import { Link } from 'react-router'

class EndpointListGroup extends React.Component {

  componentWillMount() {
    // TODO cache opened folders
    this.setState({
      isOpen: false
    })
  }

  renderIcon() {

    if(this.state.isOpen) {
      return <Icon name="folder-open-o" size="lg" />
    }

    return <Icon name="folder-o" size="lg" />
  }

  renderEndpoints(endpoints) {
    const { id, groupPath, isActive, selected } = this.props

    if(this.state.isOpen) {
      return endpoints.map(endpoint => (
        <EndpointListItem
          key={endpoint.id}
          isSelected={(selected === `${endpoint.id}`)}
          groupId={id}
          path={groupPath}
          {...endpoint} />
      ))
    }

    return []
  }

  toggleOpen(isActive, selected) {

    // Will not close when user wants to select open group
    if((!isActive && this.state.isOpen) || (selected && this.state.isOpen)) {
      return;
    }

    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { id, groupName, endpoints, isActive, selected } = this.props
    const topStyle = (isActive && !selected) ? styles.selected : styles.link

    return (
      <div className={styles.root}>
        <Link to={`/docs/${id}`} className={topStyle} onClick={this.toggleOpen.bind(this, isActive, selected)}>
          <span>
            { this.renderIcon() }
            <span className={styles.groupName}>{ groupName }</span>
          </span>
          { (isActive && !selected) && <Icon name="ellipsis-h" /> }
        </Link>
        <div className={styles.endpoints}>
          { this.renderEndpoints(endpoints) }
        </div>
      </div>
    )
  }
}

export default EndpointListGroup
