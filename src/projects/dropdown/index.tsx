import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DropdownModal from './DropdownModal';
import useFetchData from './useFetchData';

const Dropdown = () => {
  const DropdownRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    value: '',
  });
  const [popUpSize, setPopUpSize] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const { data } = useFetchData();

  const togglePopup = () => {
    console.log('togglePopup');

    setIsVisible(prev => !prev);
  };

  const onLayout = () => {
    if (DropdownRef && DropdownRef.current) {
      // @ts-expect-error ref error measure might be null
      DropdownRef.current.measure(
        (fx: any, fy: any, width: any, height: any, px: any, py: string) => {
          setPopUpSize({
            height,
            width,
            top: parseInt(py, 10),
            left: px,
          });
        }
      );
    }
  };

  const onCloseModal = () => {
    setIsVisible(false);
  };

  const renderItem = ({ item }: any) => {
    const { first, last } = item.name;
    return (
      <View style={styles.popupItem}>
        <Text style={styles.popupItemText}>{`${first} ${last}`}</Text>
      </View>
    );
  };
  const onSelectItem = (item: any) => {
    const { first, last } = item.name;
    setSelectedItem({ value: `${first} ${last}` });
  };

  return (
    <>
      <View onLayout={onLayout} ref={DropdownRef} style={styles.actionButton}>
        <Pressable style={styles.inputStyle} onPress={togglePopup}>
          <Text>{selectedItem.value ? selectedItem.value : 'Select'}</Text>
        </Pressable>
      </View>
      <DropdownModal
        onClose={onCloseModal}
        isVisible={isVisible}
        popUpSize={popUpSize}
        options={data}
        renderItem={renderItem}
        onSelectItem={onSelectItem}
        inputPlaceholder={selectedItem.value}
      />
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  actionButton: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
  },
  popupItem: {
    padding: 10,
  },
  popupItemText: {},
});
