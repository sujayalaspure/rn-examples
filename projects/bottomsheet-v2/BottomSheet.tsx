import {View, StyleSheet} from "react-native"
import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useState} from "react"
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
  snapPoints: [string, ...string[]]
  snapIndex?: number
  onClosed?: () => void
}
export type BottomSheetRef = {
  open: () => void
  close: () => void
  snapToIndex: (index: number) => void
  snapToPosition: (position: string) => void
}

const convertPercentToNumber = (percentString: string) => {
  return parseFloat(percentString) / 100
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>((props, ref) => {
  const {children, canClose, showBackdrop, snapPoints, snapIndex} = props
  const translateY = useSharedValue(0)
  const context = useSharedValue({y: 0})
  const isSheetVisible = useSharedValue(false)
  const panGestureRef = React.useRef<GestureType>(Gesture.Pan())
  const snapPositions = useMemo(
    () => snapPoints?.map((item) => convertPercentToNumber(item) * screenHeight),
    [snapPoints]
  )

  const [isTopReached, setIsTopReached] = useState(false)

  const maxTopPosition = -1 * (snapPositions[snapPositions?.length - 1] || 1)
  const maxBottomPosition = snapPositions[0]

  const scrollTo = useCallback((y: number) => {
    "worklet"
    y = y < 0 ? y : y * -1
    translateY.value = withSpring(y, {damping: 15})
    isSheetVisible.value = y !== 0
  }, [])

  const snapToIndex = useCallback((index: number) => {
    if (index < 0 || index >= snapPositions.length) return
    scrollTo(snapPositions[index])
  }, [])

  const snapToPosition = useCallback((position: string) => {
    const pos = convertPercentToNumber(position) * screenHeight
    scrollTo(pos)
  }, [])

  const open = useCallback(() => {
    const heightFromBottom = snapPositions[0]
    console.log("Sheet open", heightFromBottom, snapPositions)

    scrollTo(heightFromBottom)
  }, [snapPoints, snapIndex])

  const close = useCallback(() => {
    console.log("Sheet close", canClose)

    if (canClose) scrollTo(0)
  }, [canClose])

  useImperativeHandle(ref, () => ({snapToIndex, open, close, snapToPosition}), [
    snapToIndex,
    open,
    close,
    snapToPosition,
  ])

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value}
    })
    .onUpdate(({translationY}: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      console.log("Sheet update", translationY, context.value.y)
      translateY.value = Math.max(maxTopPosition, translationY + context.value.y)
      runOnJS(setIsTopReached)(translateY.value === maxTopPosition)
    })
    .onEnd(() => {
      if (Math.abs(translateY.value) < maxBottomPosition) {
        scrollTo(canClose ? 0 : snapPositions[0])
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
      <Animated.View
        onTouchStart={showBackdrop ? close : undefined}
        animatedProps={rBackdropProps}
        style={[StyleSheet.absoluteFillObject, rBackDropStyle]}
      />
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
