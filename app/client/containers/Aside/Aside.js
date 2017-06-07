import React from 'react';
import { connect } from 'react-redux';

import EndpointList from 'components/EndpointList/EndpointList';
import TextInput from 'components/Form/TextInput/TextInput';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import IconButton from 'components/Button/IconButton';
import Tabs from 'components/Tabs/Tabs';
import Sidebar from 'components/Sidebar/Sidebar';

import { filterEndpoints } from 'services/endpoint-service';

import { openModal } from 'actions/modals';
import { MODAL_NAME as ADD_NEW_MODAL } from 'modals/AddEndpointModal/AddEndpointModal';

import {
  addNewGroup,
  addNewEndpoint,
  addNewDocument,
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
    this.setState({ search: '', status: '' });
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

  addNewDocument = () => {
    this.props.dispatch(addNewDocument());
    this.props.dispatch(openModal(ADD_NEW_MODAL));
  }

  render() {
    const { group_id: groupId, endpoint_id: endpointId } = this.props.params;
    const tabData = [
      { title: 'All', id: 'all' },
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
      <div id="endpoint-list">
        <Sidebar>
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
            onAddNewDocument={this.addNewDocument}
          />
        </Sidebar>
      </div>
    );
  }
}


export default Aside;
