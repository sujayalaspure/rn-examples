import { View, Text, StyleSheet, StatusBar, Button, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRef } from '../projects/bottomsheet/BottomSheet';
import useFetchData, { RandomuserResponseData } from '../projects/dropdown/useFetchData';

type Props = {
  navigation: NavigationProp<any>;
};

const BottomSheetView = ({ navigation }: Props) => {
  const sheetRef = React.useRef<BottomSheetRef>(null);
  const { data } = useFetchData();
  const [shouldScroll, setShouldScroll] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const onOpenPress = () => {
    if (sheetRef.current?.isActive()) {
      sheetRef.current?.scrollTo(0);
    } else {
      sheetRef.current?.scrollTo(-400);
    }
  };

  const updateShouldScroll = (position: number) => {
    if (position === 0) {
      setShouldScroll(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Button title="Go back" onPress={navigation.goBack} />
      <Pressable onPress={onOpenPress}>
        <View style={styles.button} />
      </Pressable>
      <BottomSheet ref={sheetRef} onTopReached={setShouldScroll}>
        <View style={{ flex: 1 }}>
          <FlatList
            scrollEnabled={shouldScroll}
            data={data}
            renderItem={ListItem}
            keyExtractor={item => item.login.uuid}
            ListFooterComponent={<View style={{ height: 10, backgroundColor: 'red' }} />}
            onScroll={e => {
              updateShouldScroll(e.nativeEvent.contentOffset.y);
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const ListItem = ({ item }: { item: RandomuserResponseData }) => {
  const { name } = item;
  return (
    <Pressable
      pointerEvents="box-only"
      onPress={() => {
        console.log(`${name.title} ${name.first} ${name.last}`);
      }}>
      <View style={styles.itemContainer}>
        <Text>{`${name.title} ${name.first} ${name.last}`}</Text>
      </View>
    </Pressable>
  );
};

export default BottomSheetView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'cyan'
  }
});
