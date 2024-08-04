import {View, Text, StyleSheet} from "react-native"
import React from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"

type Props = {
  iconBGColor?: string
  iconColor?: string
  children?: React.ReactNode
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap
}

const IconWrapper = ({iconBGColor = "#ffffff", iconColor = "#000000", iconName, children}: Props) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.patchBox} />
      <View style={[styles.iconWrapper, {backgroundColor: iconBGColor}]}>
        {children ? children : <MaterialCommunityIcons name={iconName} size={44} color={iconColor} />}
      </View>
    </View>
  )
}

export default IconWrapper

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 1000,
    width: 70,
    height: 70,
    position: "absolute",
    top: -35,
    left: "50%",
    right: "50%",
    transform: [{translateX: -15}],
    padding: 5,
  },
  patchBox: {
    backgroundColor: "white",
    height: 35,
    position: "absolute",
    top: 35,
    width: 100,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 1000,
    flex: 1,
    aspectRatio: 1,
  },
  shadow: {
    shadowColor: "#353839",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
})
