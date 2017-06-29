import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styles from './UpdateProjectVisibilityForm.css';

import Icon from 'components/Icon/Icon';
import RFRadiobutton from 'components/Form/RFRadiobutton/RFRadiobutton';
import Button from 'components/Button/Button';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

let UpdateProjectVisibilityForm = (props) => {
  const { handleSubmit, submitting } = props;
  const publicLabel = (
    <div className={styles.optionlabel}>
      <div className={styles.optionIcon}><Icon name="globe" /></div>
      <div>
        <div className={styles.optionLabelTitle}>Public</div>
        <div className={styles.optionLabelDescription}>
          Anyone with a link can see a documentation.
        </div>
      </div>
    </div>
  );

  const privateLabel = (
    <div className={styles.optionlabel}>
      <div className={styles.optionIcon}><Icon name="lock" /></div>
      <div>
        <div className={styles.optionLabelTitle}>Private</div>
        <div className={styles.optionLabelDescription}>
          Only you can see a documentation.
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      { submitting && <LoadingIndicator /> }
      <div className={styles.radioWrapper}>
        <Field
          name="public"
          component={RFRadiobutton}
          options={[
            { value: true, label: publicLabel },
            { value: false, label: privateLabel },
          ]}
        />
      </div>
      <Button
        type="submit"
        variants={['primary', 'large', 'block']}
      >
        Save
      </Button>
    </form>
  );
};

UpdateProjectVisibilityForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
};

export default UpdateProjectVisibilityForm = reduxForm({
  form: 'UpdateProjectVisibilityForm',
})(UpdateProjectVisibilityForm);

