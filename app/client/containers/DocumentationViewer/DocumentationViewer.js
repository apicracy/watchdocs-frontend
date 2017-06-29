import React from 'react';
import { connect } from 'react-redux';
import styles from './DocumentationViewer.css';
// HACK: Importing to plug into css selector for scrollspy :)
import appLayoutStyles from 'containers/AppLayout.css';

import AppLayout from 'containers/AppLayout';

import Sidebar from 'components/Sidebar/Sidebar';
import TextInput from 'components/Form/TextInput/TextInput';
import Icon from 'components/Icon/Icon';
import CustomIcon from 'components/Icon/CustomIcon';
import IconButton from 'components/Button/IconButton';
import DocLayout from 'components/Documentation/DocLayout';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { ScrollSpy, Link } from 'components/ScrollSpy/ScrollSpy';

import { fetchDocumentation } from 'services/documentation';

@connect(store => ({
  documentation: store.documentation.data,
  isFetching: store.documentation.isFetching,
  projectUrl: store.documentation.data.base_url,
  currentUser: store.session.user,
  canEdit: store.session.user && store.session.user.id === store.documentation.data.user_id
}))

class DocumentationViewer extends React.Component {
  static propTypes = {
    documentation: React.PropTypes.array,
    projectUrl: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
    params: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    canEdit: React.PropTypes.bool,
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

    if (nextProps.params.project_name && nextProps.params.project_name !== this.props.params.project_name) {
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

  render() {
    const { documentation, isFetching } = this.props;

    return (
      <div className={styles.container}>
        { isFetching && <LoadingIndicator fixed /> }
        <Sidebar>
          { /* Hack: Connect to appLayout styles to obtain selector */ }
          <ScrollSpy rootEl={`.${appLayoutStyles.content}`}>
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
