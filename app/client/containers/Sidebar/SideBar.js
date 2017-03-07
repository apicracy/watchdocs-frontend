import React from 'react';
import { connect } from 'react-redux';
import styles from './SideBar.css';

import EndpointList from 'components/EndpointList/EndpointList';
import TextInput from 'components/TextInput/TextInput';
import Icon from 'components/Icon/Icon';

import { filterEndpoints } from 'services/endpoint-service';

@connect(store => ({
  endpoints: store.endpoints,
}))
class SideBar extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    endpoints: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  componentWillMount() {
    this.setState({ search: '' });
  }

  filter = ({ nativeEvent }) => {
    this.setState({ search: nativeEvent.target.value });
  }

  render() {
    const { group_id: groupId, endpoint_id: endpointId } = this.props.params;
    const endpoints = filterEndpoints(
      this.props.endpoints,
      { search: this.state.search },
    );

    return (
      <aside className={styles.sideBar}>
        <TextInput
          placeholder="Filter"
          iconRight={<Icon name="search" />}
          onChange={this.filter}
        />
        <EndpointList
          endpoints={endpoints}
          activeGroup={groupId}
          selected={endpointId}
        />
      </aside>
    );
  }
}


export default SideBar;
