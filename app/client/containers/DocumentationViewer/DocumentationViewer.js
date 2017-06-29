import React from 'react';
import { connect } from 'react-redux';
import styles from './DocumentationViewer.css';

import Sidebar from 'components/Sidebar/Sidebar';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import IconButton from 'components/Button/IconButton';
import DocLayout from 'components/Documentation/DocLayout';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { ScrollSpy, Link } from 'components/ScrollSpy/ScrollSpy';

import { openModal } from 'actions/modals';
import { MODAL_NAME as UPDATE_PROJECT_VISIBILITY_MODAL } from 'modals/ProjectVisibilityModal/ProjectVisibilityModal';
import { fetchDocumentation } from 'services/documentation';

@connect(store => ({
  documentation: store.documentation.data,
  isFetching: store.documentation.isFetching,
  projectUrl: store.projects.activeProject.base_url,
  activeProject: store.projects.activeProject,
}))

class DocumentationViewer extends React.Component {
  static propTypes = {
    documentation: React.PropTypes.array,
    projectUrl: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
    activeProject: React.PropTypes.object,
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
        { v.title || v.name }
      </Link>
    ));
  }

  openPublicitySettings() {
    this.props.dispatch(openModal(UPDATE_PROJECT_VISIBILITY_MODAL));
  }

  render() {
    const { documentation, activeProject } = this.props;

    return (
      <div>
        { activeProject && activeProject.public && (
          <div className={styles.publicDocumentation}>
            <Icon name="globe" />
            Your documentation is public.
            Share this link with your teammates.

            <div className={styles.publicityToggle}>
              <a onClick={() => this.openPublicitySettings()}>
                Change visibility
              </a>
            </div>
          </div>
        )}
        <div className={styles.container}>
          { this.props.isFetching && <LoadingIndicator fixed /> }
          <Sidebar>
            <ScrollSpy>
              { this.renderMenu() }
            </ScrollSpy>
          </Sidebar>
          <div className={styles.docView}>
            { this.renderDoc(documentation, true) }
          </div>
        </div>
      </div>
    );
  }
}

export default DocumentationViewer;
