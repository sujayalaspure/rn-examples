import {View, StyleSheet} from "react-native"
import React from "react"

type Props = {
  index: number
}

const RowItem = ({index}: Props) => {
  return (
    <View
      key={index}
      style={[
        styles.container,
        {
          backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
        },
      ]}
    >
      <View style={styles.circle} />
      <View>
        <View style={[styles.line, {width: 200}]} />
        <View style={styles.line} />
      </View>
    </View>
  )
}

export default RowItem

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
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
})
