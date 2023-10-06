import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {Link} from "expo-router"

type Props = {
  title: string
  link: string
}

const ItemCard = ({title, link}: Props) => {
  return (
    <View style={styles.container}>
      <Link href={link} style={styles.link}>
        <Text>{title}</Text>
      </Link>
    </View>
  )
}

export default ItemCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
  },
  link: {
    padding: 20,
  },
})
