import {View, Text, Modal, StyleSheet, Dimensions, Pressable} from "react-native"
import React, {forwardRef, useImperativeHandle, useState} from "react"
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming} from "react-native-reanimated"

type Props = {
  onClose?: () => void
  children: React.ReactNode
  title?: string
  showCloseButton?: boolean
}

export type AnimatedModalRef = {
  open: () => void
  close: () => void
}

const {width} = Dimensions.get("window")

const AnimatedModal = forwardRef<AnimatedModalRef, Props>(({onClose, children, title, showCloseButton}, ref) => {
  const scale = useSharedValue(1)
  const [isVisible, setIsVisible] = useState(false)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    }
  })

  const open = () => {
    console.log("open")
    setIsVisible(true)
    scale.value = withSpring(1)
  }

  const close = () => {
    scale.value = withTiming(0, {
      duration: 200,
    })
    setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, 150)
  }

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    []
  )

  return (
    <Modal visible={isVisible} onRequestClose={close} transparent animationType="fade">
      <Pressable onPress={close} style={styles.container}>
        <Animated.View
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation()
          }}
          style={[styles.content, animatedStyle]}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            {showCloseButton && (
              <Pressable style={styles.closebutton} onPress={close}>
                <Text style={styles.closebuttonText}>X</Text>
              </Pressable>
            )}
          </View>
          {children}
        </Animated.View>
      </Pressable>
    </Modal>
  )
})

export default AnimatedModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closebutton: {
    padding: 2,
    borderRadius: 20,
    backgroundColor: "#FFE4E1",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "red",
  },
  closebuttonText: {
    color: "red",
    aspectRatio: 1 / 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
})
