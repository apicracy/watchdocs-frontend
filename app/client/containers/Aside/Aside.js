import React from 'react';
import { connect } from 'react-redux';
import styles from './Aside.css';

import EndpointList from 'components/EndpointList/EndpointList';
import TextInput from 'components/Form/TextInput/TextInput';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import IconButton from 'components/Button/IconButton';
import Tabs from 'components/Tabs/Tabs';

import { filterEndpoints } from 'services/endpoint-service';

import { openModal } from 'actions/modals';
import { MODAL_NAME as ADD_NEW_MODAL } from 'modals/AddNewModal/AddNewModal';
import { MODAL_NAME as EDIT_MODAL } from 'modals/EditModal/EditModal';

import {
  loadEndpoint,
  loadFolder,
  addNewGroup,
  addNewEndpoint,
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
    this.setState({ search: '', status: '', width: 300, baseWidth: 300, dragStart: null });
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

  clearFilter = () => this.setState({ search: '' });

  renderIcon() {
    if (this.state.search.length > 0) {
      return <IconButton icon={<Icon name="close" />} onClick={this.clearFilter} />;
    }

    return <CustomIcon name="search" />;
  }

  addNewEndpoint = () => {
    this.props.dispatch(addNewEndpoint());
    this.props.dispatch(openModal(ADD_NEW_MODAL));
  }

  addNewGroup = () => {
    this.props.dispatch(addNewGroup());
    this.props.dispatch(openModal(ADD_NEW_MODAL));
  }

  onClickGroupMore = (id) => {
    this.props.dispatch(loadFolder(id));
    this.props.dispatch(openModal(EDIT_MODAL));
  }

  onClickItemMore = (id) => {
    this.props.dispatch(loadEndpoint(id));
    this.props.dispatch(openModal(EDIT_MODAL));
  }

  render() {
    const { group_id: groupId, endpoint_id: endpointId } = this.props.params;
    const tabData = [
      { title: 'All', id: 'all' },
      { title: 'Valid', id: 'valid' },
      { title: 'Invalid', id: 'invalid' },
      { title: 'Outdated', id: 'outdated' },
    ];

    const endpoints = filterEndpoints(
      this.props.endpoints,
      {
        search: this.state.search,
        status: this.state.status,
      },
    );

    return (
      <aside className={styles.sideBar} style={{ width: this.state.width }}>
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
          iconRight={this.renderIcon()}
          onChange={this.filter}
        />
        <Tabs data={tabData} onChange={this.tabChange} />
        <EndpointList
          endpoints={endpoints}
          activeGroup={groupId}
          selected={endpointId}
          onAddNewGroup={this.addNewGroup}
          onAddNewEndpoint={this.addNewEndpoint}
          onClickItemMore={this.onClickItemMore}
          onClickGroupMore={this.onClickGroupMore}
        />
      </aside>
    );
  }
}


export default Aside;
