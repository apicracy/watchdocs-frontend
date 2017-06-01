import React from 'react';

import styles from './Settings.css';

import Select from 'components/Form/Select/Select';
import TextInput from 'components/Form/TextInput/TextInput';
import Button from 'components/Button/Button';
import ParamTable from 'components/ParamTable/ParamTable';

class Setup extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.addressWrapper}>
          <TextInput variant="no-border" placeholder="Address email" />
          <div className={styles.selectWrapper}>
            <Select activeId={1} options={[{ id: 1, name: 'As a normal user' }]} />
          </div>
          <div className={styles.buttonWrapper}>
            <Button variants={['primary', 'large']}>Invite</Button>
          </div>
        </div>
        <div className={styles.emailWrapper}>
          <ParamTable
            headers={[
              { key: 'email', text: 'Email', style: { flex: 3 } },
              { key: 'permission', text: 'Permission', style: { flex: 1 } },
              { key: 'actions', text: 'Actions', style: { flex: 1 } },
            ]}
            data={[
              { email: 'k.szromek@exlabs.pl', permission: 'Owner' },
              { email: 'd.ratka@exlabs.pl (Accepted)', permission: 'Normal', actions: 'Make admin | Remove' },
              { email: 'p.slowik@exlabs.pl (Accepted)', permission: 'Admin', actions: 'Remove admin | Remove' }]}
          />
        </div>
      </div>
    );
  }
}

export default Setup;
