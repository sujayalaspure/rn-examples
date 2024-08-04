import {Pressable, PressableProps, StyleSheet, Text} from "react-native"
import React from "react"

interface Props extends PressableProps {
  children?: React.ReactNode
  type?: "link" | "button"
  title?: string
  color?: string
}

const Button = ({children, title, type = "button", color = "#007FFF", ...rest}: Props) => {
  return (
    <Pressable style={[styles.container, {backgroundColor: color}]} {...rest}>
      {title ? <Text style={styles.text}>{title}</Text> : children}
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007FFF",
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
