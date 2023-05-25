import { FlatList, View } from 'react-native';
import React from 'react';
import screenlist from '../navigator/routes';
import MenuButton from '../components/MenuButton';

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
  console.log('HomeScreen', screenlist);
  return (
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
    </View>
  );
};

export default HomeScreen;
