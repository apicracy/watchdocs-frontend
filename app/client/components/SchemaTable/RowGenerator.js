import React from 'react';

import ObjectRow from './ObjectRow';
import ArrayRow from './ArrayRow';
import PrimitiveRow from './PrimitiveRow';

const RowGenerator = ({ name, isRequired, node, initializeOpen }) => {
  switch (node.type) {
    case 'object': return <ObjectRow node={node} isRequired={isRequired} name={name} />;
    case 'array': return <ArrayRow node={node} isRequired={isRequired} name={name} initializeOpen={initializeOpen} />;
    default: return <PrimitiveRow node={node} isRequired={isRequired} name={name} />;
  }
};

RowGenerator.propTypes = {
  node: React.PropTypes.object,
  name: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
  initializeOpen: React.PropTypes.bool,
};

export default RowGenerator;
