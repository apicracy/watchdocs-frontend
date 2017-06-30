import React from 'react';
import styles from './InputLink.css';

import Icon from 'components/Icon/Icon';
import IconButton from 'components/Button/IconButton';

const InputLink = (props) => {
  const { children, placeholder, onClick } = props;

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        { children }
        { !children && placeholder && (
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
  placeholder: React.PropTypes.string,
  onClick: React.PropTypes.func,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.node,
  ]),
};

export default InputLink;
