import {View, Text, StyleSheet} from "react-native"
import React from "react"

type Props = {
  bgColor: string
  label: string
}

const Box = ({bgColor, label}: Props) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text>{label}</Text>
    </View>
  )
}

export default Box

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    aspectRatio: 1,
    margin: 10,
  },
})
