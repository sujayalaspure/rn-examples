import {View, Text} from "react-native"
import React from "react"
import RNSlider from "@react-native-community/slider"

type Props = {
  label: string
  value: number
  onValueChange: (value: number) => void
  minValue?: number
  maxValue?: number
}

const Slider = ({label, value, onValueChange, minValue = 0, maxValue = 100}: Props) => {
  return (
    <View
      style={{
        marginVertical: 10,
      }}
    >
      <Text>{label}</Text>
      <RNSlider
        onValueChange={(val) => {
          onValueChange(Math.round(val) || 0)
        }}
        value={value}
        minimumValue={minValue}
        maximumValue={maxValue}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#C0C0C0"
      />
    </View>
  )
}

export default Slider
