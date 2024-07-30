import {View, Text, StyleSheet, Pressable} from "react-native"
import React, {forwardRef, useImperativeHandle, useState} from "react"
import Animated, {useSharedValue, withSpring} from "react-native-reanimated"

type Props = {}

type StatusBarRef = {
  showOfflineBanner: (heading: string, subHeading: string) => void
  hideOfflineBanner: () => void
}

const StatusBar = forwardRef<StatusBarRef, Props>((props, ref) => {
  const height = useSharedValue(0)

  const [offlineBanner, setOfflineBanner] = useState({
    state: false,
    heading: "",
    subHeading: "",
  })

  const showBanner = (heading: string, subHeading: string) => {
    height.value = withSpring(28, {dampingRatio: 0.7, duration: 700})

    setOfflineBanner({
      state: true,
      heading,
      subHeading,
    })
  }

  const hideBanner = () => {
    height.value = withSpring(0, {duration: 1000, dampingRatio: 0.7})

    setOfflineBanner({
      state: false,
      heading: "",
      subHeading: "",
    })
  }

  const toggleStatusBar = () => {
    if (offlineBanner.state) {
      hideBanner()
    } else {
      showBanner("No Network Connection", "Full application functionality is not available while offline.")
    }
  }

  useImperativeHandle(ref, () => ({
    showOfflineBanner: showBanner,
    hideOfflineBanner: hideBanner,
  }))

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={toggleStatusBar}>
          <Text style={styles.title}>StatusBar</Text>
        </Pressable>
      </View>
      <Animated.View style={[styles.offlineBannerContainer, {height}]}>
        {!!offlineBanner.heading && (
          <Pressable
            onPress={() => {
              height.value = withSpring(48, {dampingRatio: 0.7, duration: 700})
            }}
          >
            <Text style={styles.bannerText}>{offlineBanner.heading}</Text>
          </Pressable>
        )}
        {!!offlineBanner.subHeading && <Text style={styles.bannerSubText}>{offlineBanner.subHeading}</Text>}
      </Animated.View>
    </>
  )
})

export default StatusBar

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    height: 60,
    marginTop: 47,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  offlineBannerContainer: {
    backgroundColor: "#5D6C87",
    // padding: 4,
    alignItems: "center",
    overflow: "hidden",
    // flex: 1,
  },
  bannerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  bannerSubText: {
    color: "white",
    fontSize: 14,
  },
})
