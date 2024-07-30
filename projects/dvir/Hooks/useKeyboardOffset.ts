import {View, Text, Keyboard} from "react-native"
import React, {useEffect, useRef, useState} from "react"

type Props = {}

const useKeyboardOffset = () => {
  const [keyboardOffset, setKeyboardOffset] = useState(0)
  const onKeyboardShow = (event) => setKeyboardOffset(event.endCoordinates.height)
  const onKeyboardHide = () => setKeyboardOffset(0)
  const keyboardDidShowListener = useRef()
  const keyboardDidHideListener = useRef()

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener("keyboardWillShow", onKeyboardShow)
    keyboardDidHideListener.current = Keyboard.addListener("keyboardWillHide", onKeyboardHide)

    return () => {
      keyboardDidShowListener.current.remove()
      keyboardDidHideListener.current.remove()
    }
  }, [])
  return {keyboardOffset}
}

export default useKeyboardOffset
