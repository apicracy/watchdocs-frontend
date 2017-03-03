import React from 'react'
import "font-awesome-webpack";

const Icon = ({ name, size }) => {
  name = 'fa fa-' + name

  if(size && size === 'lg') {
    name += ` fa-lg`
  } else if (size) {
    name += ` fa-${size}x`
  }

  return <i className={name}></i>
}

export default Icon
