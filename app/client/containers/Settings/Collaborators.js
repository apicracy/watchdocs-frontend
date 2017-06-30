import React from 'react';

import styles from './Settings.css';

import { connect } from 'react-redux';
import Select from 'react-select';

import TextInput from 'components/Form/TextInput/TextInput';
import Button from 'components/Button/Button';
import ParamTable from 'components/ParamTable/ParamTable';
import DocumentationBlock from 'components/DocumentationBlock/DocumentationBlock';


@connect(store => ({
  users: [store.session.user],
}))

class Setup extends React.Component {
  static propTypes = {
    users: React.PropTypes.array,
  }

  render() {
    const usersTable = this.props.users.map(user => (
      { email: user.email, permission: 'Owner' }
    ));

    return (
      <div className={styles.usersContainer}>
        <DocumentationBlock
          title="Application team"
        >
          <div className="row">
            <div className="col-md-8">
              <TextInput placeholder="Address email" />
            </div>
            <div className="col-md-2">
              <Select options={['Admin', 'Collaborator', 'Reader']} />
            </div>
            <div className="col-md-2">
              <Button variants={['primary', 'large', 'block']}>Invite</Button>
            </div>
          </div>
          <div className={styles.emailWrapper}>
            <ParamTable
              headers={[
                { key: 'email', text: 'Email', style: { flex: 3 } },
                { key: 'permission', text: 'Permission', style: { flex: 1 } },
              ]}
              data={usersTable}
            />
          </div>
        </DocumentationBlock>
        <div className={styles.overflow}>
          <div className={styles.overflowTitle}>Coming soon</div>
          <div className={styles.overflowDescription}>We're going to bring you team access for your app soon</div>
        </div>
      </div>
    );
  }
}

export default Setup;
