import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MenuButton from '../components/MenuButton';
import Icon from '../components/Icon';

type ImageItem = {
  id: number;
  src: string;
};

const TestScreen = () => {
  const [modalConfig, setModalConfig] = useState({
    visible: false,
    title: '',
    url: ''
  });
  const [dataSource, setDataSource] = useState<ImageItem[]>([]);

  useEffect(() => {
    const items = [...Array(8)].map((v, i) => ({
      id: i,
      src: `https://unsplash.it/800/800?image=${i + 1}`
    }));
    setDataSource(items);
  }, []);

  const openModal = (item: any) => {
    setModalConfig({
      visible: true,
      title: 'Test',
      url: item.src
    });
  };

  const closeModal = () => {
    setModalConfig({
      visible: false,
      title: '',
      url: ''
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ height: 1000 }}>
        {dataSource.map(() => (
          <ScrollView horizontal contentContainerStyle={{ width: 1000 }}>
            {dataSource.map((Hitem: ImageItem) => (
              <MenuButton src={Hitem.src} backdropOpacity={0.6} showImage onPress={() => openModal(Hitem)} />
            ))}
          </ScrollView>
        ))}
      </ScrollView>
      <ModalContent modalConfig={modalConfig} closeModal={closeModal} />
    </View>
  );
};

const ModalContent = ({ modalConfig, closeModal }: any) => (
  <Modal presentationStyle="pageSheet" onRequestClose={closeModal} animationType="slide" visible={modalConfig.visible}>
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Test</Text>
        <Pressable onPress={closeModal}>
          <Icon name="close" color="red" size={30} />
        </Pressable>
      </View>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri: modalConfig.url }} />
      </View>
    </SafeAreaView>
  </Modal>
);

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  imageWrapper: {
    // backgroundColor: 'yellow'
  },
  image: {
    height: 500,
    resizeMode: 'contain'
  }
});
