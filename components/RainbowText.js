import React from 'react'

const RainbowText = (props) => {
  return (
    <span className={'linear-wipe font-bold ' + props.className}>{props.text}</span>
  )
}

export default RainbowText