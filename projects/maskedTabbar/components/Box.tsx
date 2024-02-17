import {View, Text, StyleSheet} from "react-native"
import React from "react"

type Props = {
  bgColor: string
  label: string
}

const Box = ({bgColor, label}: Props) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.circle} />
      <View style={styles.spacing} />
      <View>
        <View style={styles.line} />
        <View style={[styles.line, {width: 100}]} />
      </View>
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
  circle: {
    height: 50,
    width: 50,
    opacity: 0.2,
    backgroundColor: "white",
    borderRadius: 25,
  },
  line: {
    height: 10,
    width: 150,
    borderRadius: 5,
    opacity: 0.2,
    backgroundColor: "white",
    marginVertical: 5,
  },
  spacing: {
    height: 30,
  },
})
