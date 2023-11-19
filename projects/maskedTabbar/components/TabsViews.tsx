import {View, Text, Pressable, StyleSheet} from "react-native"
import React, {useState} from "react"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import Animated, {Extrapolate, interpolate, useAnimatedStyle} from "react-native-reanimated"
import {TABS} from "@projects/maskedTabbar/data"
type Props = {
  onPress: (i: number) => void
  scrollX: number
}

const TabsViews = ({onPress, scrollX}: Props) => {
  const [layoutWidth, setLayoutWidth] = useState(0)

  return (
    <View
      style={styles.tabContainer}
      onLayout={(e) => {
        setLayoutWidth(e.nativeEvent.layout.width)
      }}
    >
      {TABS.map((tab, index) => (
        <TabItem
          {...tab}
          onPress={onPress}
          key={index}
          index={index}
          layoutWidth={layoutWidth}
          scrollX={scrollX < 1 ? 0 : scrollX - 40}
        />
      ))}
    </View>
  )
}

type TabItemProps = {
  icon: string
  iconOutline: string
  label: string
  onPress: (i: number) => void
  index: number
  layoutWidth: number
  scrollX: number
}

const TabItem = ({icon, iconOutline, label, onPress, index, layoutWidth, scrollX}: TabItemProps) => {
  console.log("TabItem", scrollX, layoutWidth)
  const inputRange = TABS.map((_, i) => i * layoutWidth)
  const outputRange = TABS.map((_, i) => {
    const diff = i - index
    const x = layoutWidth / TABS.length
    return diff * x
  })
  const translateX = useAnimatedStyle(() => {
    const translate = interpolate(scrollX, inputRange, outputRange, Extrapolate.CLAMP)
    return {
      transform: [{translateX: translate}],
    }
  }, [scrollX, layoutWidth])
  const outputRangeText = TABS.map((_, i) => {
    const diff = i - index
    const x = layoutWidth / TABS.length
    return -diff * x
  })
  const translateXText = useAnimatedStyle(() => {
    const translate = interpolate(scrollX, inputRange, outputRangeText, Extrapolate.CLAMP)
    return {
      transform: [{translateX: translate}],
    }
  }, [scrollX, layoutWidth])

  return (
    <Pressable
      style={{flex: 1, overflow: "hidden"}}
      onPress={() => {
        onPress(index)
      }}
    >
      <View style={[styles.iconTextContainer]}>
        <MaterialCommunityIcons name={icon} size={24} color={"grey"} style={{marginRight: 10}} />
        <Text style={{color: "grey"}}>{label}</Text>
      </View>
      <Animated.View style={[styles.tabBGColor, translateX, {overflow: "hidden"}]}>
        <Animated.View style={[styles.iconTextContainer, translateXText]}>
          <MaterialCommunityIcons name={iconOutline} size={24} color={"#000"} style={{marginRight: 10}} />
          <Text style={{color: "#000"}}>{label}</Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}
export default TabsViews

const styles = StyleSheet.create({
  tabBGColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
    borderRadius: 1000,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#DBD7D2",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 8,
  },
})
