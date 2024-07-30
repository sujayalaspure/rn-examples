import {View, Text, FlatList, Dimensions, StyleSheet, ScrollView} from "react-native"
import React, {useRef, useState} from "react"
import StatusBar from "@projects/dvir/components/StatusBar"
import TabsViews from "@projects/maskedTabbar/components/TabsViews"
import {useSharedValue} from "react-native-reanimated"
import {TABS} from "@projects/maskedTabbar/data"
import {TextInput} from "react-native-gesture-handler"
import InputBox from "@projects/dvir/components/InputBox"

type Props = {}
const {height, width} = Dimensions.get("window")

const TestUI = (props: Props) => {
  const statusBarRef = useRef(null)
  const slideRef = useRef<FlatList>(null)
  const [scrollX, setScrollX] = useState(0)
  const currentIndex = useSharedValue(0)

  const scrollTo = (i: number) => {
    currentIndex.value = i
    slideRef.current?.scrollToIndex({index: i})
  }
  return (
    <>
      <StatusBar ref={statusBarRef} />
      <ScrollView>
        <View
          style={{
            height: height * 0.2,
            backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <InputBox placeholder="top search" />
        <View
          style={{
            height: height * 0.4,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <InputBox placeholder="Bottom search" />
      </ScrollView>
    </>
  )
}

export default TestUI

const styles = StyleSheet.create({
  input: {
    width: width * 0.9,
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
  },
})
