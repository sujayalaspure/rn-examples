import {View, Text, StyleSheet} from "react-native"
import React, {useEffect, useRef, useState} from "react"
import Button from "@components/Button"
import BottomSheet, {BottomSheetProps, BottomSheetRef} from "@projects/bottomsheet"
import {screenHeight} from "@constants/scalingUnit"
import Switch from "@components/Switch"
import Spacer from "@components/atoms/Spacer"

type Props = {}

type BottomSheetConfigType = keyof BottomSheetProps

const bottomsheet = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null)
  const [bottomSheetConfig, setBottomSheetConfig] = useState<Partial<BottomSheetProps>>({
    canClose: true,
    showBackdrop: true,
  })
  // useEffect(() => {
  //   bottomSheetRef.current?.open()
  // }, [])

  const updateConfig = (key: BottomSheetConfigType) => (value: any) =>
    setBottomSheetConfig((prev) => ({...prev, [key]: value}))

  return (
    <>
      <View style={styles.container}>
        <View>
          <Button
            title="Open Bottom Sheet"
            onPress={() => {
              bottomSheetRef.current?.open()
            }}
          >
            <Text>bottomsheet</Text>
          </Button>
          <Spacer height={20} />
          <Button
            title="Close Bottom Sheet"
            onPress={() => {
              bottomSheetRef.current?.close()
            }}
          >
            <Text>bottomsheet</Text>
          </Button>
          <Spacer height={20} />
          <Switch label="Can Close" value={bottomSheetConfig.canClose} onValueChange={updateConfig("canClose")} />
          <Spacer height={10} />
          <Switch
            label="Show Backdrop"
            value={bottomSheetConfig.showBackdrop}
            onValueChange={updateConfig("showBackdrop")}
          />
        </View>
      </View>

      <BottomSheet ref={bottomSheetRef} sheetHeight={screenHeight * 0.4} {...bottomSheetConfig}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <View
            key={index}
            style={{height: 100, backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16)}}
          >
            <Text>hello {index}</Text>
          </View>
        ))}
      </BottomSheet>
    </>
  )
}

export default bottomsheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
})
