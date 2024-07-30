import {TextInput, StyleSheet, Dimensions, TextInputProps, KeyboardAvoidingView} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import useKeyboardOffset from "@projects/dvir/Hooks/useKeyboardOffset"

type Props = TextInputProps
Dimensions.get("window")

const InputBox = (props: Props) => {
  const {keyboardOffset} = useKeyboardOffset()
  const input = useRef<TextInput>(null)
  const [bottom, setBottom] = useState(0)
  console.log(keyboardOffset)

  useEffect(() => {
    input.current?.measure((height, py) => {
      if (input.current?.isFocused()) setBottom(keyboardOffset === 0 ? 0 : Math.max(0, py - keyboardOffset))
      else setBottom(0)
    })
  }, [keyboardOffset])

  return <TextInput ref={input} style={[styles.input, {bottom}]} placeholder="Search" {...props} />
}

export default InputBox
const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderWidth: 1,
  },
})
