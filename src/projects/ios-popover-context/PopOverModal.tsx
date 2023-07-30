import { View, Text, StyleSheet, FlatList, Modal, Pressable, Dimensions, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { BlurView } from '@react-native-community/blur';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const PopOverModal = ({ closeModal, children, options, modalVisible, showContent }: any) => {
  const menuOffset = useSharedValue(0);
  const childrenOffset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: menuOffset.value,
    transform: [
      {
        scale: menuOffset.value,
      },
    ],
  }));
  const animatedStylesChildren = useAnimatedStyle(() => ({
    opacity: childrenOffset.value,
    transform: [
      {
        scale: childrenOffset.value,
      },
    ],
  }));

  useEffect(() => {
    if (showContent.showImage) {
      childrenOffset.value = withDelay(
        5,
        withSpring(1, {
          damping: 10,
          stiffness: 50,
        }),
      );
    }
    if (showContent.showOptions) {
      menuOffset.value = withDelay(10, withSpring(1));
    }
  }, [showContent]);

  useEffect(() => {
    if (!modalVisible) {
      menuOffset.value = 0;
      childrenOffset.value = 0;
      return;
    }
    console.log('PopOverModal');
    // menuOffset.value = withDelay(5, withSpring(1));
    // childrenOffset.value = withDelay(
    //   5,
    //   withSpring(1, {
    //     damping: 10,
    //     stiffness: 50,
    //   }),
    // );
  }, [modalVisible]);

  return (
    <Modal animationType="fade" visible={modalVisible} onRequestClose={closeModal} transparent>
      <BlurView
        style={styles.absolute}
        blurType="ultraThinMaterialDark"
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <Pressable onPress={closeModal} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Animated.View
              style={[
                { overflow: 'hidden', margin: 20, flex: 1, borderRadius: 12, borderWidth: 1 },
                animatedStylesChildren,
              ]}>
              {children}
            </Animated.View>
            <Animated.View style={[{ backgroundColor: 'white', borderRadius: 12, padding: 8 }, animatedStyles]}>
              <FlatList
                style={{ flexGrow: 0 }}
                data={options}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      closeModal();
                    }}
                    style={{ width: width - 40, paddingVertical: 5 }}>
                    <Text>{item.title}</Text>
                  </Pressable>
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={Separator}
              />
            </Animated.View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default PopOverModal;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const Separator = () => <View style={{ height: 1, backgroundColor: 'black' }} />;
