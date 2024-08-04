import {View, Text, StyleSheet} from "react-native"
import React, {useState} from "react"
import AnimatedModal, {AnimatedModalRef} from "@projects/animatedModal"
import Button from "@components/Button"
import Spacer from "@components/atoms/Spacer"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const AnimatedModalScreen = () => {
  const modalRef = React.useRef<AnimatedModalRef>(null)
  const [alertConfig, setAlertConfig] = useState({
    title: "Modal Title",
  })
  return (
    <View style={styles.container}>
      <View>
        <Button
          title="Alert"
          color="#FF3800"
          onPress={() => {
            setAlertConfig((prev) => ({title: "Alert", hideCloseButton: true, tintColor: "#FF3800"}))
            modalRef.current?.open()
          }}
        />
        <Spacer height={20} />
        <Button
          title="Question"
          onPress={() => {
            setAlertConfig((prev) => ({title: "Question?", tintColor: "#007FFF"}))
            modalRef.current?.open()
          }}
        />
        <Spacer height={20} />
        <Button
          title="Request"
          color="#03C03C"
          onPress={() => {
            setAlertConfig((prev) => ({title: "Request!", tintColor: "#03C03C"}))
            modalRef.current?.open()
          }}
        />
      </View>

      <AnimatedModal
        animationType="scale"
        ref={modalRef}
        IconComponent={<MaterialCommunityIcons name={"alert-plus"} size={44} color={"white"} />}
        actionButtons={[
          {
            title: "Close",
            onPress: () => {
              modalRef.current?.close()
            },
            // textColor: "white",
            isCancel: true,
          },
          {
            title: "Done",
            onPress: () => {
              modalRef.current?.close()
            },

            // color: "#FF3800",
            textColor: "white",
          },
        ]}
        {...alertConfig}
      >
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nemo alias nihil iure eveniet impedit
          corporis libero delectus quis. Quisquam debitis illum, ab temporibus eligendi dolorum molestiae dolore esse
          corporis!
        </Text>
        {/* <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nemo alias nihil iure eveniet impedit
          corporis libero delectus quis. Quisquam debitis illum, ab temporibus eligendi dolorum molestiae dolore esse
          corporis!
        </Text> */}
        {/* <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nemo alias nihil iure eveniet impedit
          corporis libero delectus quis. Quisquam debitis illum, ab temporibus eligendi dolorum molestiae dolore esse
          corporis!
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nemo alias nihil iure eveniet impedit
          corporis libero delectus quis. Quisquam debitis illum, ab temporibus eligendi dolorum molestiae dolore esse
          corporis!
        </Text> */}
      </AnimatedModal>
    </View>
  )
}

export default AnimatedModalScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
})
