import {View, Text, StyleSheet} from "react-native"
import React from "react"

type Props = {
  color: string
}

const BoxView = ({color}: Props) => {
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.circle} />
      <View style={styles.spacing} />
      <View>
        <View style={styles.line} />
        <View style={[styles.line, {width: 100}]} />
      </View>
    </View>
  )
}

export default BoxView

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
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
