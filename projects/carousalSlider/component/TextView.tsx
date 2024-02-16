import {View, Text, StyleSheet} from "react-native"
import React from "react"
import Animated, {useAnimatedStyle} from "react-native-reanimated"

type Props = {
  title: string
  description: string
  scrollX?: number
}

const TextView = ({title, description, scrollX}: Props) => {
  return (
    <Animated.View style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Animated.View>
  )
}

export default TextView

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    // paddingHorizontal: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    opacity: 0.5,
    textAlign: "center",
  },
})
