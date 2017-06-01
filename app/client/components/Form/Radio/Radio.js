import React from 'react';
import styles from './Radio.css';
import CustomIcon from 'components/Icon/CustomIcon';
import Button from 'components/Button/Button';

const Radio = ({ title, options, onChange, activeId }) => {
  const parsedTitle = title.map ? title.map((p, i) => <span key={i}>{p}</span>) : title;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        { parsedTitle }
      </div>
      <div className={styles.buttons}>
        {
          options.map(option => (
            <Button
              key={option.id}
              variants={['iconLeft', 'spaceRight', option.id === activeId ? 'linkPrimary' : '']}
              icon={<CustomIcon name={option.id === activeId ? 'radio-checked' : 'radio-unchecked'} size="lg" />}
              onClick={() => onChange(option)}
            >
              { option.text }
            </Button>
          ))
        }
      </div>
    </div>
  );
};

Radio.propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
    React.PropTypes.arrayOf([
      React.PropTypes.string,
      React.PropTypes.node,
    ]),
  ]),
  options: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  activeId: React.PropTypes.node,
};

export default Radio;
