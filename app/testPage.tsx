import {View, Text, StyleSheet, TextInput, Pressable} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import Animated, {useAnimatedStyle, withSpring} from "react-native-reanimated"
import {Link} from "expo-router"

type Props = {}

const TestPage = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const [timer, setTimer] = useState(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(isFocused ? -14 : 8),
      fontSize: withSpring(isFocused ? 16 : 20),
      fontWeight: withSpring(isFocused ? "bold" : "normal"),
      padding: withSpring(isFocused ? 4 : 0),
    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setIsFocused(false)
          inputRef?.current?.blur()
        }}
      >
        <Text>Close</Text>
      </Pressable>
      <Text>Timer: {timer}</Text>
      <Link href="/testui">
        <Text>Go to testUI</Text>
      </Link>
      <View style={styles.box}>
        <Animated.Text style={[styles.placeholderText, animatedStyle]}>Search</Animated.Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false)
          }}
        />
      </View>
    </View>
  )
}

export default TestPage

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: "center",
    // flex: 1,
    backgroundColor: "white",
  },
  box: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    padding: 8,
    minWidth: 200,
  },
  placeholderText: {
    fontSize: 20,
    color: "grey",
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "white",
  },
  placeholderTextFocused: {
    top: -14,
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
  },
  input: {
    // flex: 1,
    fontSize: 20,
  },
})
