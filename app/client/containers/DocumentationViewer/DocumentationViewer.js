import React from 'react';
import { connect } from 'react-redux';
import styles from './DocumentationViewer.css';
// HACK: Importing to plug into css selector for scrollspy :)
import appLayoutStyles from 'containers/AppLayout.css';

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
  projectUrl: store.documentation.data.base_url,
  currentUser: store.session.user,
  canEdit: store.session.user && store.session.user.id === store.documentation.data.user_id,
  activeProject: store.projects.activeProject,
}))

class DocumentationViewer extends React.Component {
  static propTypes = {
    documentation: React.PropTypes.array,
    projectUrl: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
    params: React.PropTypes.object,
    canEdit: React.PropTypes.bool,
    activeProject: React.PropTypes.object,
  }

  componentWillMount() {
    const { dispatch, params: { project_name } } = this.props;

    this.setState({
      search: '',
    });

    dispatch(fetchDocumentation(project_name));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (
      nextProps.params.project_name &&
      nextProps.params.project_name !== this.props.params.project_name
    ) {
      dispatch(fetchDocumentation(nextProps.params.project_name));
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
      canEdit,
      params: { project_name: projectSlug },
    } = this.props;

    return documentation.map((v, i) => (
      <DocLayout
        key={i}
        topLevel={isTop}
        doc={v}
        projectUrl={projectUrl}
        projectSlug={projectSlug}
        canEdit={canEdit}
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
    const { documentation, activeProject, isFetching, params } = this.props;
    const documentationPath = `https://app.watchdocs.io/${params.project_name}/documentation`;

    /* eslint-disable */
    return (
      <div>
        { isFetching && <LoadingIndicator fixed /> }
        { activeProject && activeProject.public && (
          <div className={styles.publicDocumentation}>
            <Icon name="globe" />
            Your documentation is public.
            Share
            <a href={documentationPath} className={styles.publicLink}>
              {documentationPath}
            </a>
            with your teammates.

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
            <ScrollSpy rootEl={`.${appLayoutStyles.content}`}>
              { this.renderMenu() }
            </ScrollSpy>
          </Sidebar>
          <div className={styles.docView}>
            { this.renderDoc(documentation, true) }
          </div>
        </div>
      </div>
    );
    /* eslint-enable */
  }
}

export default DocumentationViewer;
