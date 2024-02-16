import {StyleSheet} from "react-native"
import React from "react"
import {Link} from "expo-router"
import Animated from "react-native-reanimated"

type Props = {
  title: string
  link: string
}

const ItemCard = ({title, link}: Props) => {
  return (
    <Animated.View sharedTransitionTag={`view_${title}`} style={styles.container}>
      <Link href={link} style={styles.link}>
        <Animated.Text sharedTransitionTag={`text_${title}`} style={styles.text}>
          {title}
        </Animated.Text>
      </Link>
    </Animated.View>
  )
}

export default ItemCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 8,
  },
  text: {
    color: "#000000",
  },
  link: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
})
