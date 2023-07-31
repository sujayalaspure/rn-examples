import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import IOSPopover from '../projects/ios-popover-context/IOSPopover';

type ImageItem = {
  id: number;
  src: string;
};

const PopoverScreen = ({ navigation }: any) => {
  const [dataSource, setDataSource] = useState<ImageItem[]>([]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const items = [...Array(12)].map((v, i) => ({
      id: i,
      src: `https://source.unsplash.com/random/?productivity,city,image=${i + 1}`,
    }));
    setDataSource(items);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}>
      <IOSPopover item={dataSource} />
    </View>
  );
};

export default PopoverScreen;
