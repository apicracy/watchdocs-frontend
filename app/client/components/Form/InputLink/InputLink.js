import React from 'react';
import styles from './InputLink.css';

import Icon from 'components/Icon/Icon';
import IconButton from 'components/Button/IconButton';

const InputLink = (props) => {
  const { text, placeholder, onClick } = props;

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        { text }
        { !text && placeholder && (
          <span className={styles.placeholder}>{ placeholder }</span>
        )}
      </div>
      <div className={styles.action}>
        <IconButton icon={<Icon name="pencil" size="lg" />} onClick={onClick} />
      </div>
    </div>
  );
};

InputLink.propTypes = {
  text: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default InputLink;
