import { FlatList, View } from 'react-native';
import React from 'react';
import screenlist from '../navigator/routes';
import MenuButton from '../components/MenuButton';
import { Button } from '../components/Form';
import { RNModalRef } from '../components/RNModal';

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => (
  <View style={{ backgroundColor: '#002147', flex: 1, padding: 16 }}>
    <FlatList
      data={screenlist}
      renderItem={({ item, index }) => (
        <MenuButton
          src={`https://unsplash.it/400/400?image=${index + 1}`}
          title={`Go to ${item.name}`}
          onPress={() => {
            navigation.navigate(item.name);
          }}
        />
      )}
      numColumns={2}
      keyExtractor={(_, index) => index.toString()}
    />

    <Button
      text="Open RNModal"
      onPress={() => {
        RNModalRef.current?.open(ModalChildren, { presentationStyle: 'pageSheet' });
      }}
    />
  </View>
);

export default HomeScreen;

const ModalChildren = () => (
  <Button
    text="Close RNModal"
    onPress={() => {
      RNModalRef.current?.close();
    }}
  />
);
