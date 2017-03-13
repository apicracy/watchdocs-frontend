import React from 'react';
import { connect } from 'react-redux';
import styles from './Aside.css';

import EndpointList from 'components/EndpointList/EndpointList';
import TextInput from 'components/TextInput/TextInput';
import Icon from 'components/Icon/Icon';
import Tabs from 'components/Tabs/Tabs';

import { filterEndpoints } from 'services/endpoint-service';

import {
  addNewEndpoint,
  loadEndpoint,
  loadFolder,
} from 'services/modifyEndpoint-service';

@connect(store => ({
  endpoints: store.endpoints,
}))
class Aside extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    endpoints: React.PropTypes.arrayOf(React.PropTypes.object),
    dispatch: React.PropTypes.func,
  }

  componentWillMount() {
    // Load width from cache
    this.setState({ search: '', status: '', width: 250, baseWidth: 250, dragStart: null });
  }

  onDragStart = ({ nativeEvent }) => {
    this.setState({ dragStart: nativeEvent.pageX });
  }

  onDrag = ({ nativeEvent }) => {
    if (this.state.width + (nativeEvent.pageX - this.state.dragStart) > 200) {
      this.setState({
        width: this.state.width + (nativeEvent.pageX - this.state.dragStart),
        dragStart: nativeEvent.pageX,
      });
    }
  }

  onDragEnd = () => {
    this.setState({
      baseWidth: null,
    });
  }

  tabChange = (activeTab) => {
    this.setState({ status: activeTab });
  }

  filter = ({ nativeEvent }) => {
    this.setState({ search: nativeEvent.target.value });
  }

  addNewEndpoint = () => {
    this.props.dispatch(addNewEndpoint());
  }

  onClickGroupMore = (id) => {
    this.props.dispatch(loadFolder(id));
  }

  onClickItemMore = (id) => {
    this.props.dispatch(loadEndpoint(id));
  }

  render() {
    const { group_id: groupId, endpoint_id: endpointId } = this.props.params;
    const tabData = [
      { title: 'All', id: 'all' },
      { title: 'Valid', id: 'valid' },
      { title: 'Invalid', id: 'invalid' },
    ];

    const endpoints = filterEndpoints(
      this.props.endpoints,
      {
        search: this.state.search,
        status: this.state.status,
      },
    );

    return (
      <aside className={styles.sideBar} style={{ flexBasis: this.state.width }}>
        <div
          draggable
          onDragStart={this.onDragStart}
          onDrag={this.onDrag}
          onDragEnd={this.onDragEnd}
          className={styles.handle}
        />

        <TextInput
          value={this.state.search}
          placeholder="Filter"
          iconRight={<Icon name="search" />}
          onChange={this.filter}
        />
        <Tabs data={tabData} onChange={this.tabChange} />
        <EndpointList
          endpoints={endpoints}
          activeGroup={groupId}
          selected={endpointId}
          onAddNewEndpoint={this.addNewEndpoint}
          onClickItemMore={this.onClickItemMore}
          onClickGroupMore={this.onClickGroupMore}
        />
      </aside>
    );
  }
}


export default Aside;