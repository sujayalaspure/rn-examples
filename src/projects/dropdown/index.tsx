import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView } from 'react-native';
import DropdownModal from './DropdownModal';
import { RandomuserAPIResponse } from './useFetchData';
import useFetchData from '../../hooks/useFetchData';

const Dropdown = () => {
  const DropdownRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    value: ''
  });
  const [modalPosition, setModalPosition] = useState({
    top: 0,
    left: 0
  });
  const [modalTriggerSize, setModalTriggerSize] = useState({
    width: 0,
    height: 0
  });

  const { data } = useFetchData<RandomuserAPIResponse>({
    url: 'https://randomuser.me/api/?results=50&inc=id,gender,name,nat,email,picture,login'
  });

  const togglePopup = () => {
    // @ts-expect-error ref error measure might be null
    DropdownRef.current.measure((fx: any, fy: any, width: any, height: any, px: any, py: string) => {
      setModalPosition({ top: parseInt(py, 10), left: px });
      setModalTriggerSize({ width, height });
    });
    setIsVisible(prev => !prev);
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
    <KeyboardAvoidingView behavior="position">
      <View ref={DropdownRef} style={styles.actionButton}>
        <Pressable style={styles.inputStyle} onPress={togglePopup}>
          <Text>{selectedItem.value ? selectedItem.value : 'Select'}</Text>
        </Pressable>
      </View>
      <DropdownModal
        modalPosition={modalPosition}
        modalTriggerSize={modalTriggerSize}
        onClose={onCloseModal}
        isVisible={isVisible}
        options={data?.results || []}
        renderItem={renderItem}
        onSelectItem={onSelectItem}
        inputPlaceholder={selectedItem.value}
      />
    </KeyboardAvoidingView>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputStyle: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5
  },
  actionButton: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5
  },
  popupItem: {
    padding: 10
  },
  popupItemText: {}
});
