import { Image, StyleSheet, Dimensions, Pressable, ImageBackground, FlatList } from 'react-native';
import React, { useState } from 'react';
import PopOverModal from './PopOverModal';

const { width, height } = Dimensions.get('window');
type Props = {
  item: any;
};

const popoverOptions = [
  { id: 1, title: 'Save Image' },
  { id: 2, title: 'Copy Image' },
  { id: 3, title: 'Share Image' },
  { id: 4, title: 'Close' },
];

const IOSPopover = ({ item }: Props) => {
  const [imageUrl, setImageUrl] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState({
    showImage: false,
    showOptions: false,
  });
  const closeModal = () => {
    setModalVisible(false);
    setImageUrl('');
  };
  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1685549777106-5cb12cd91d22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
      }}>
      <FlatList
        data={item}
        renderItem={({ item: img }) => (
          <Pressable
            onPress={() => {
              setModalVisible(true);
              setImageUrl(img.src);
              // setBlur(30);
            }}>
            <Image style={styles.image} source={{ uri: img.src }} />
          </Pressable>
        )}
        numColumns={2}
      />
      <PopOverModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        options={popoverOptions}
        showContent={showContent}>
        <Pressable>
          <Image
            // defaultSource={dummyImage}
            onLoad={() => {
              setModalVisible(true);
              setShowContent({ showImage: true, showOptions: true });
            }}
            style={styles.modalImage}
            source={{ uri: imageUrl }}
          />
        </Pressable>
      </PopOverModal>
    </ImageBackground>
  );
};

export default IOSPopover;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
  image: {
    borderWidth: 1,
    resizeMode: 'cover',
    aspectRatio: 1 / 1,
    height: width * 0.5,
  },
  modalImage: {
    resizeMode: 'cover',
    width: width - 20,
    height: '100%',
    maxHeight: height * 0.8,
    // backgroundColor: 'cyan',
  },
});
