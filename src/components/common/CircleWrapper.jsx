import { View, Text } from 'react-native'
import React from 'react'
import Circle from './Circle'
const CircleWrapper = () => {
  return (
    <>
      <Circle translateX={-20} translateY={-120} />
        <Circle translateX={-100} translateY={-240} />
    </>
  )
}

export default CircleWrapper