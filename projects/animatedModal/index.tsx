import {View, Text, Modal, StyleSheet, Dimensions, Pressable} from "react-native"
import React, {forwardRef, useImperativeHandle, useState} from "react"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import IconWrapper from "@projects/animatedModal/IconWrapper"
const {height} = Dimensions.get("window")

type ActionButtonProps = {
  title: string
  onPress: () => void
  color?: string
  textColor?: string
  isCancel?: boolean
}

type Props = {
  onClose?: () => void
  children: React.ReactNode
  title?: string
  hideCloseButton?: boolean
  actionButtons?: Array<ActionButtonProps>
  showbackdropBG?: boolean
  cancelable?: boolean
  IconComponent?: React.ReactNode
  animationType?: "scale" | "slide" | "none"
  tintColor?: string
}

export type AnimatedModalRef = {
  open: () => void
  close: () => void
}

const {width} = Dimensions.get("window")

const AnimatedModal = forwardRef<AnimatedModalRef, Props>(
  (
    {
      onClose,
      children,
      title,
      hideCloseButton = false,
      actionButtons,
      showbackdropBG = true,
      cancelable = true,
      IconComponent,
      animationType,
      tintColor = "#FF3800",
    },
    ref
  ) => {
    const scale = useSharedValue(0)
    const opacity = useSharedValue(0)
    const [isVisible, setIsVisible] = useState(false)
    const [contentMeasure, setContentMeasure] = useState({width: 0, height: 0, x: 0, y: 0})

    const animatedStyleScale = useAnimatedStyle(() => {
      if (animationType === "none") return {transform: [{scale: 1}]}
      const opacity = interpolate(scale.value, [0.5, 1], [0, 1], Extrapolate.CLAMP)
      return {transform: [{scale: scale.value}], opacity}
    }, [scale.value])

    const animatedStyleSlide = useAnimatedStyle(() => {
      if (animationType === "none") return {transform: [{translateY: 0}]}

      const translateY = interpolate(scale.value, [0, 1], [height, contentMeasure.y - 50], Extrapolate.CLAMP)
      return {
        transform: [{translateY: withSpring(translateY, {duration: 1000, dampingRatio: 0.5})}],
      }
    }, [scale.value, contentMeasure.height])

    const open = () => {
      console.log("open")
      setIsVisible(true)
      scale.value = withSpring(1)
      opacity.value = withTiming(1)
    }

    const close = () => {
      scale.value = withTiming(0, {
        duration: 200,
      })
      opacity.value = withTiming(0)

      setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, 150)
    }
    const handleClose = () => {
      if (!cancelable) return
      close()
    }

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
      }),
      []
    )
    const backdropBG = {backgroundColor: showbackdropBG ? "rgba(0,0,0,0.4)" : "transparent"}

    const animatedStyle = animationType === "scale" ? animatedStyleScale : animatedStyleSlide

    return (
      <Modal visible={isVisible} onRequestClose={handleClose} transparent animationType="fade">
        <Pressable onPress={handleClose} style={[styles.container, backdropBG]}>
          <Animated.View
            onLayout={(e) => {
              setContentMeasure(e.nativeEvent.layout)
            }}
            onStartShouldSetResponder={(_) => true}
            onTouchEnd={(e) => {
              e.stopPropagation()
            }}
            style={[styles.content, animatedStyle, styles.shadow]}
          >
            {!!IconComponent && (
              <IconWrapper iconBGColor={tintColor} iconColor="#ffffff">
                {IconComponent}
              </IconWrapper>
            )}
            {!!title && (
              <View style={[styles.header, {marginTop: !!IconComponent ? 25 : 0}]}>
                <Text style={styles.headerText}>{title}</Text>
              </View>
            )}
            {children}
            <View style={styles.actionButtonsWrapper}>
              {actionButtons
                ?.filter((item) => (!hideCloseButton ? true : !item.isCancel))
                ?.map((item) => (
                  <Pressable
                    key={item.title}
                    onPress={item?.onPress}
                    style={[
                      styles.actionButton,
                      {backgroundColor: (!item.isCancel && tintColor) || item?.color || "#F7F7F7"},
                    ]}
                  >
                    <Text style={[styles.actionButtonText, {color: item.textColor || "black"}]}>{item.title}</Text>
                  </Pressable>
                ))}
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    )
  }
)

export default AnimatedModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: width * 0.9,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
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
  actionButtonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
  actionButtonSuccess: {},
  shadow: {
    shadowColor: "#353839",
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
})
