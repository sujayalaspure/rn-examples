import { View, Text } from "react-native"
import React from "react"
import { Link } from "expo-router"

type Props = {}

const About = (props: Props) => {
  return (
    <View>
      <Text>About</Text>
      <Link href="/home">home</Link>
    </View>
  )
}

export default About
