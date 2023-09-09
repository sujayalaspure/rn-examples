import { View, Text } from "react-native"
import React from "react"
import { Link } from "expo-router"

type Props = {}

const home = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>home</Text>
      <Link href="/screens/about">about</Link>
    </View>
  )
}

export default home
