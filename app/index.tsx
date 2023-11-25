import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {projects} from "../projects"
import ItemCard from "../components/ItemCard"
import "react-native-gesture-handler"

type Props = {}

const HomeScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      {projects.map((project, index) => (
        <ItemCard key={index} {...project} />
      ))}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F2F3F4",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
})
