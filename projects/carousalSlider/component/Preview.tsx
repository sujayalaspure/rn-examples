import {View, StyleSheet, Dimensions} from "react-native"
import React from "react"
import TextView from "./TextView"
import BoxView from "./BoxView"
import Animated, {useAnimatedStyle} from "react-native-reanimated"

const {width} = Dimensions.get("window")
type Props = {
  item: {
    title: string
    description: string
    image: string
    color: string
  }
  scrollX: number
  index: number
  titleScrollSpeed?: number
}

const Preview = ({item, scrollX, index, titleScrollSpeed = 0}: Props) => {
  const {title, description} = item
  const posW = width * index
  const scrollSpeed = titleScrollSpeed / 33
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -(scrollX - posW) * scrollSpeed ?? 0}],
    }
  })
  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle]}>
        <TextView {...{title, description}} />
      </Animated.View>
      <BoxView color={item.color} />
    </View>
  )
}
export default Preview

const styles = StyleSheet.create({
  container: {
    // height: 300,
    width,
    // margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  controlWrapper: {},
})
