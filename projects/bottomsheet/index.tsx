import {View, StyleSheet} from "react-native"
import React, {forwardRef, useCallback, useImperativeHandle, useState} from "react"
import {
  Gesture,
  GestureDetector,
  GestureType,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
  ScrollView,
} from "react-native-gesture-handler"
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import {screenHeight} from "@constants/scalingUnit"

export type BottomSheetProps = {
  onTopReached?: (value: boolean) => void
  children: React.ReactNode
  showBackdrop?: boolean
  canClose?: boolean
  sheetHeight?: number
  snapPoints?: {top?: number; bottom?: number}
  onClosed?: () => void
}
export type BottomSheetRef = {
  scrollTo: (y: number) => void
  open: () => void
  isActive?: () => boolean
  close: () => void
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>((props, ref) => {
  const {children, canClose, sheetHeight, showBackdrop} = props
  console.log("BottomSheet", props)
  const translateY = useSharedValue(0)
  const context = useSharedValue({y: 0})
  const isSheetVisible = useSharedValue(false)
  const panGestureRef = React.useRef<GestureType>(Gesture.Pan())

  const [isTopReached, setIsTopReached] = useState(false)

  const maxTopPosition = -1 * screenHeight
  const maxBottomPosition = screenHeight * 0.3

  const scrollTo = useCallback((y: number) => {
    "worklet"
    y = y < 0 ? y : y * -1
    translateY.value = withSpring(y, {damping: 15})
    isSheetVisible.value = y !== 0
  }, [])

  const open = useCallback(() => {
    console.log("Sheet open")
    scrollTo(sheetHeight || 200)
  }, [])

  const close = useCallback(() => {
    console.log("Sheet close", canClose)

    if (canClose) scrollTo(0)
  }, [canClose])

  useImperativeHandle(ref, () => ({scrollTo, open, close}), [scrollTo, open, close])

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value}
    })
    .onUpdate(({translationY}: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      translateY.value = Math.max(maxTopPosition, translationY + context.value.y)
      runOnJS(setIsTopReached)(translateY.value === maxTopPosition)
    })
    .onEnd(() => {
      if (Math.abs(translateY.value) < maxBottomPosition) {
        scrollTo(canClose ? 0 : sheetHeight || 400)
      } else if (Math.abs(translateY.value) > Math.abs(maxTopPosition) * 0.8) {
        scrollTo(maxTopPosition)
      }
    })

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const height = interpolate(translateY.value, [0, maxTopPosition], [0, -maxTopPosition - 100], Extrapolate.CLAMP)
    return {
      transform: [{translateY: withSpring(translateY.value, {damping: 15})}],
      height: withSpring(height, {damping: 15}),
    }
  })

  const rAnimatedBorderRadius = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [maxTopPosition + 50, maxTopPosition],
      [25, 5],
      Extrapolate.CLAMP
    )
    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    }
  })

  const rBackDropStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isSheetVisible.value ? 1 : 0, {duration: 200}),
    backgroundColor: showBackdrop ? "rgba(0,0,0,0.5)" : "transparent",
  }))
  const rBackdropProps = useAnimatedProps(() => ({pointerEvents: isSheetVisible.value ? "auto" : "none"} as any))

  return (
    <>
      {true && (
        <Animated.View
          onTouchStart={showBackdrop ? close : undefined}
          animatedProps={rBackdropProps}
          style={[StyleSheet.absoluteFillObject, rBackDropStyle]}
        >
          {/* <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
        /> */}
        </Animated.View>
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheetStyle, rAnimatedBorderRadius]}>
          <Animated.View style={[styles.topBar, rAnimatedBorderRadius]}>
            <View style={styles.line} />
          </Animated.View>
          <ScrollView
            simultaneousHandlers={[panGestureRef]}
            scrollEnabled={isTopReached}
            onScroll={(e) => {
              if (e.nativeEvent.contentOffset.y <= 0) {
                setIsTopReached(false)
              }
            }}
            scrollEventThrottle={40}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </>
  )
})

export default BottomSheet

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: screenHeight,
  },
  line: {
    height: 5,
    width: 50,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  topBar: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F3F4",
  },
})
