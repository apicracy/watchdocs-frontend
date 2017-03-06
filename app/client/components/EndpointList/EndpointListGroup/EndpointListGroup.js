import React from 'react';

import styles from './EndpointListGroup.css';

import EndpointListItem from '../EndpointListItem/EndpointListItem';
import Icon from 'components/Icon/Icon';
import { Link } from 'react-router';

class EndpointListGroup extends React.Component {

  static propTypes = {
    id: React.PropTypes.number,
    groupPath: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    activeGroup: React.PropTypes.string,
    selected: React.PropTypes.string,
  }

  componentWillMount() {
    // TODO cache opened folders
    this.setState({
      isOpen: false
    });
  }

  renderIcon() {

    if(this.state.isOpen) {
      return <Icon name="folder-open-o" size="lg" />
    }

    return <Icon name="folder-o" size="lg" />
  }

  renderEndpoint(endpoint) {
    const { id, groupPath, isActive, selected } = this.props;

    return (
      <EndpointListItem
        key={endpoint.id}
        isSelected={(selected === `${endpoint.id}`)}
        groupId={id}
        path={groupPath}
        {...endpoint} />
    );
  }

  renderEndpointGroup(group) {
    const { groupPath, selected, activeGroup } = this.props;

    return (
      <EndpointListGroup
        isActive={(`${group.id}` === activeGroup)}
        activeGroup={activeGroup}
        selected={selected}
        key={group.id}
        {...group}
        groupPath={groupPath + group.groupPath} />
    );
  }

  renderEndpointList(endpoints) {
    if(this.state.isOpen) {
      return endpoints.map(endpoint => {

        if(endpoint.method) {
          return this.renderEndpoint(endpoint)
        } else if(endpoint.groupPath) {
          return this.renderEndpointGroup(endpoint)
        }

        return null // do not render
      });
    }

    return [];
  }

  toggleOpen(isActive, selected) {

    // Will not close when user wants to select open group
    if((!isActive && this.state.isOpen) || (selected && this.state.isOpen)) {
      return;
    }

    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { id, groupName, endpoints, isActive, selected } = this.props;
    const topStyle = (isActive && !selected) ? styles.selected : styles.link;

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
          { this.renderEndpointList(endpoints) }
        </div>
      </div>
    );
  }
}

export default EndpointListGroup;
