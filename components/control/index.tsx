import {View, Text, StyleSheet} from "react-native"
import React from "react"

type Props = {
  children: React.ReactNode
}

const ControlSection = ({children}: Props) => {
  return <View style={styles.controlSection}>{children}</View>
}

export default ControlSection

const styles = StyleSheet.create({
  controlSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 10,
    marginVertical: 5,
  },
})
