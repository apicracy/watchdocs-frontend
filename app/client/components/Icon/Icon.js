import React from 'react'
import "font-awesome-webpack";

const Icon = ({ name }) => {
  name = 'fa fa-' + name
  return <i className={name}></i>
}

export default Icon
