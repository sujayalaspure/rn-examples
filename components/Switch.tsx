import {View, Text, Switch as RNSwitch, StyleSheet} from "react-native"
import React from "react"
import Spacer from "@components/atoms/Spacer"

type Props = {
  label: string
  value: boolean | undefined
  onValueChange: (value: boolean) => void
}

const Switch = ({label, value, onValueChange}: Props) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <RNSwitch value={value} onValueChange={onValueChange} />
    </View>
  )
}

export default Switch

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})
