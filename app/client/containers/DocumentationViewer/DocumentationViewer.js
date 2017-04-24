import React from 'react';
import { connect } from 'react-redux';
import styles from './DocumentationViewer.css';

import Sidebar from 'components/Sidebar/Sidebar';
import TextInput from 'components/Form/TextInput/TextInput';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import IconButton from 'components/Button/IconButton';
import DocLayout from 'components/Documentation/DocLayout';
import { ScrollSpy, Link } from 'components/ScrollSpy/ScrollSpy';

import { buildDocumentation, fetchDocumentation } from 'services/documentation';

@connect(store => ({
  documentation: store.documentation,
  projectUrl: store.projects.activeProject.base_url,
  activeProject: store.projects.activeProject,
}))
class DocumentationViewer extends React.Component {
  static propTypes = {
    documentation: React.PropTypes.array,
    projectUrl: React.PropTypes.string,
  }

  componentWillMount() {
    const { dispatch, activeProject } = this.props;

    this.setState({
      search: '',
    });

    if (activeProject.id) {
      dispatch(fetchDocumentation(activeProject.id));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { activeProject } = nextProps;

    if (activeProject.id && activeProject.id !== this.props.activeProject.id) {
      dispatch(fetchDocumentation(activeProject.id));
    }
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
    const {
      projectUrl,
    } = this.props;

    return documentation.map((v, i) => (
      <DocLayout
        key={i}
        topLevel={isTop}
        doc={v}
        projectUrl={projectUrl}
      >
        { v.items && this.renderDoc(v.items, false) }
      </DocLayout>
    ));
  }

  renderMenu() {
    return this.props.documentation.map((v, i) => (
      <Link key={i} isTop subitems={v.items} section={v.section}>
        {v.title}
      </Link>
    ));
  }

  render() {
    const { documentation } = this.props;

    return (
      <div className={styles.container}>
        <Sidebar>
          <div className={styles.marginLeft}>
            <TextInput
              value={this.state.search}
              placeholder="Search"
              iconRight={this.renderIcon()}
              onChange={this.filter}
            />
          </div>
          <ScrollSpy>
            { this.renderMenu() }
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
