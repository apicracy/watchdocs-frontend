import React from 'react';
import { connect } from 'react-redux';

import Container from 'components/Container/Container';
import Sidebar from 'components/Sidebar/Sidebar';
import TextInput from 'components/Form/TextInput/TextInput';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import IconButton from 'components/Button/IconButton';

class DocumentationViewer extends React.Component {

  componentWillMount() {
    this.setState({ search: '' });
  }

  renderIcon() {
    if (this.state.search.length > 0) {
      return <IconButton icon={<Icon name="close" />} onClick={this.clearFilter} />;
    }

    return <CustomIcon name="search" />;
  }

  filter = ({ nativeEvent }) => {
    this.setState({ search: nativeEvent.target.value });
  }

  clearFilter = () => this.setState({ search: '' });

  render() {
    return (
      <Container>
        <Sidebar>
          <TextInput
            value={this.state.search}
            placeholder="Search"
            iconRight={this.renderIcon()}
            onChange={this.filter}
          />
        </Sidebar>
        Hello world!
      </Container>
    );
  }
}

export default DocumentationViewer;
