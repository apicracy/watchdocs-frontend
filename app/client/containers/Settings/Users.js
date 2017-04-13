import React from 'react';
import { connect } from 'react-redux';

import styles from './Settings.css';

import TabPanel from 'components/TabPanel/TabPanel';
import Select from 'components/Form/Select/Select';
import TextInput from 'components/Form/TextInput/TextInput';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';

@connect(store => ({
  projectUrl: store.projects.activeProject.url,
}))
class Setup extends React.Component {

  static propTypes = {
    params: React.PropTypes.object, // supplied by react-router
    projectUrl: React.PropTypes.string, // supplied by react-router
  }

  render() {
    const {
      params,
      projectUrl,
    } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.addressWrapper}>
          <TextInput variant="white" placeholder="Address email" />
          <Select options={[{ id: 1, name: 'As a normal user' }]} />
        </div>
      </div>
    );
  }
}

export default Setup;
