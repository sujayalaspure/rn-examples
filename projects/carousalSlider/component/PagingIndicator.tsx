import {View, StyleSheet, Pressable} from "react-native"
import React from "react"

type Props = {
  count: number
  activeIndex: number
  onChange?: (index: number) => void
}

const PagingIndicator = ({count, activeIndex = 0, onChange}: Props) => {
  // console.log("PagingIndicator", activeIndex)

  return (
    <View style={styles.container}>
      {Array.from({length: count}).map((_, index) => (
        <Pressable onPress={() => onChange?.(index)} key={index}>
          <View key={index} style={[styles.box, {backgroundColor: activeIndex === index ? "#000000" : "#C0C0C0"}]} />
        </Pressable>
      ))}
    </View>
  )
}

export default React.memo(PagingIndicator)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  box: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#C0C0C0",
    marginHorizontal: 5,
  },
})
