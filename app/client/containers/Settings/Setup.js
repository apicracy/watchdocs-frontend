import React from 'react';
import { connect } from 'react-redux';

import TabPanel from 'components/TabPanel/TabPanel';
import InputLink from 'components/Form/InputLink/InputLink';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';
import Icon from 'components/Icon/Icon';

import { openModal } from 'actions/modals';
import { MODAL_NAME as UPDATE_PROJECT_MODAL } from 'modals/EditProject/EditProject';
import { MODAL_NAME as UPDATE_PROJECT_VISIBILITY_MODAL } from 'modals/ProjectVisibilityModal/ProjectVisibilityModal';

@connect(store => ({
  project: store.projects.activeProject,
}))
class Setup extends React.Component {

  static propTypes = {
    project: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  }

  render() {
    const {
      project,
    } = this.props;

    return (
      <div>
        <DocumentationBlock
          title="Installation"
        >
          <TabPanel project={project} />
        </DocumentationBlock>
      </div>
    );
  }
}

export default Setup;
