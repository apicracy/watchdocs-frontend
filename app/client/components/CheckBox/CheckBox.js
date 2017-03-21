import React from 'react';
import styles from './CheckBox.css';
import CustomIcon from 'components/Icon/CustomIcon';
import Button from 'components/Button/Button';

const CheckBox = ({ title, options, onChange, activeIds }) => {
  const parsedTitle = title.map ? title.map((p, i) => <span key={i}>{p}</span>) : title;

  return (
    <div className={styles.root}>
      { parsedTitle && (
        <div className={styles.header}>
          { parsedTitle }
        </div>
      )}
      <div className={styles.buttons}>
        {
          options.map(option => (
            <Button
              key={option.id}
              variants={['iconLeft', 'spaceRight']}
              icon={<CustomIcon name={activeIds.includes(option.id) ? 'checkbox-checked' : 'checkbox-unchecked'} size="lg" />}
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

CheckBox.propTypes = {
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
  activeIds: React.PropTypes.array,
};

CheckBox.defaultProps = {
  title: '',
};

export default CheckBox;
