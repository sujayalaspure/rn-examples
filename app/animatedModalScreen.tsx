import {View, Text, StyleSheet} from "react-native"
import React from "react"
import AnimatedModal, {AnimatedModalRef} from "@projects/animatedModal"
import Button from "@components/Button"
import Spacer from "@components/atoms/Spacer"

const AnimatedModalScreen = () => {
  const modalRef = React.useRef<AnimatedModalRef>(null)
  return (
    <View style={styles.container}>
      <View>
        <Button
          title="Open Modal"
          onPress={() => {
            modalRef.current?.open()
          }}
        />
        <Spacer height={20} />
        <Button
          title="Close Modal"
          onPress={() => {
            modalRef.current?.close()
          }}
        />
      </View>

      <AnimatedModal ref={modalRef} title="Modal Title" showCloseButton>
        <Text>Modal</Text>
        <Button title="Close" onPress={() => modalRef.current?.close()} />
        {/* <Spacer height={20} />

        <Button title="Close" onPress={() => modalRef.current?.close()} />
        <Spacer height={20} />

        <Button title="Close" onPress={() => modalRef.current?.close()} />
        <Spacer height={20} />

        <Button title="Close" onPress={() => modalRef.current?.close()} />
        <Spacer height={20} />

        <Button title="Close" onPress={() => modalRef.current?.close()} />
        <Spacer height={20} />

        <Button title="Close" onPress={() => modalRef.current?.close()} /> */}
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
