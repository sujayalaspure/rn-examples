import {View, Text, StyleSheet} from "react-native"
import React, {useRef, useState} from "react"
import Button from "@components/Button"
import BottomSheet, {BottomSheetProps, BottomSheetRef} from "@projects/bottomsheet/BottomSheet"
import {screenHeight} from "@constants/scalingUnit"
import Switch from "@components/Switch"
import Spacer from "@components/atoms/Spacer"
import RowItem from "@projects/bottomsheet/component/RowItem"

type BottomSheetConfigType = keyof BottomSheetProps

const BottomsheetView = () => {
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
          <Button title="Open"onPress={() => bottomSheetRef.current?.open()}
          />
          <Spacer height={10} />
          <Button title="Close"onPress={() => bottomSheetRef.current?.close()}
          />
          <Spacer height={10} />
          <Button title="index 0"onPress={() => bottomSheetRef.current?.snapToIndex(0)}
          />
          <Spacer height={10} />
          <Button title="index 1"onPress={() => bottomSheetRef.current?.snapToIndex(1)}
          />
          <Spacer height={10} />
          <Button title="index 2"onPress={() => bottomSheetRef.current?.snapToIndex(2)}
          />
          <Spacer height={10} />
          <Button title="index 3"onPress={() => bottomSheetRef.current?.snapToPosition("100%")}
          />
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

      {/* Bottom Sheet Component */}
      <BottomSheet ref={bottomSheetRef} snapPoints={['25%', '50%', "75%"]} snapIndex={0} {...bottomSheetConfig}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <RowItem index={index} key={index} />
        ))}
      </BottomSheet>
    </>
  )
}

export default BottomsheetView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
})
