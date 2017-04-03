import React from 'react';
import { connect } from 'react-redux';
import styles from './DocumentationViewer.css';

import Container from 'components/Container/Container';
import Content from 'components/Content/Content';
import Sidebar from 'components/Sidebar/Sidebar';
import TextInput from 'components/Form/TextInput/TextInput';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import IconButton from 'components/Button/IconButton';
import DocLayout from 'components/Documentation/DocLayout';
import { ScrollSpy, Link } from 'components/ScrollSpy/ScrollSpy';

import { buildDocumentation } from 'services/documentation';

@connect(store => ({
  endpoints: store.endpoints,
}))
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

  renderDoc(documentation, isTop) {
    return documentation.map((v, i) => (
      <DocLayout
        key={i}
        topLevel={isTop}
        doc={v}
      >
        { v.children && this.renderDoc(v.children, false) }
      </DocLayout>
    ));
  }

  renderMenu(documentation) {
    return documentation.map((v, i) => <Link key={i} section={v.section}>{v.title}</Link>)
  }

  render() {
    const documentation = buildDocumentation(this.props.endpoints);

    return (
      <div className={styles.container}>
        <Sidebar>
          <TextInput
            value={this.state.search}
            placeholder="Search"
            iconRight={this.renderIcon()}
            onChange={this.filter}
          />
          <ScrollSpy>
            { this.renderMenu(documentation) }
          </ScrollSpy>
        </Sidebar>
        <div className={styles.docView}>
          { this.renderDoc(documentation, true) }
        </div>
      </div>
    );
  }
}

export default DocumentationViewer;
