import React from 'react';
import styles from './EndpointList.css';

import EndpointListGroup from './EndpointListGroup/EndpointListGroup';

const EndpointList = (props) => {
  const { endpoints, activeGroup, selected } = props;

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {
          /* TODO not sure if id will be int or string */
          endpoints.map(group => (
            <EndpointListGroup
              isActive={(`${group.id}` === activeGroup)}
              isOpen={!!group.isOpen}
              activeGroup={activeGroup}
              selected={selected}
              key={group.id}
              {...group}
            />
          ))
        }
      </div>
    </div>
  );
};

EndpointList.propTypes = {
  endpoints: React.PropTypes.array,
  activeGroup: React.PropTypes.string,
  selected: React.PropTypes.string,
};

export default EndpointList;
