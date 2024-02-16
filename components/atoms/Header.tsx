import {View, Text, StyleSheet} from "react-native"
import React from "react"
import Animated from "react-native-reanimated"

type Props = {
  children: React.ReactNode
  title: string
}

const Header = ({title}: Props) => {
  return (
    <Animated.View sharedTransitionTag={`view_${title}`} style={styles.container}>
      <Animated.Text sharedTransitionTag={`text_${title}`} style={styles.heading}>
        {title}
      </Animated.Text>
    </Animated.View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#F2F3F4",
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    // paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
})
