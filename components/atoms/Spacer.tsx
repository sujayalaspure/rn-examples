import {View, Text, DimensionValue} from "react-native"
import React from "react"

type Props = {
  height?: DimensionValue
  width?: DimensionValue
}

const Spacer = ({height = "100%", width = "100%"}: Props) => {
  return <View style={{height, width}} />
}

export default Spacer
