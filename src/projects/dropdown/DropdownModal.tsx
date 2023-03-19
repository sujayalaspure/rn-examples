/* eslint-disable max-lines */
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  Animated,
  FlatList,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const ANIMATE_DURATION = 300;
const { height: screenHeight } = Dimensions.get('window');
const MAX_HEIGHT = screenHeight * 0.6;

type DropdownModalProps = {
  isVisible: boolean;
  onClose: () => void;
  popUpSize: { top: number; left: number; width: number; height: number };
  options: any[];
  onSearch?: (text: string) => void;
  renderItem: (item: any) => JSX.Element;
  onSelectItem?: (item: any) => void;
  inputPlaceholder?: string;
};

const DropdownModal = ({
  isVisible,
  onClose,
  popUpSize,
  options,
  onSearch,
  renderItem,
  onSelectItem,
  inputPlaceholder,
}: DropdownModalProps) => {
  const [viewHeight, setViewHeight] = useState({
    one: 0,
    all: 0,
  });

  const [shouldShowAtBottom, setShouldShowAtBottom] = useState(true);

  const maxHeight = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(1)).current;

  const { left, width } = popUpSize;

  useLayoutEffect(() => {
    setShouldShowAtBottom(MAX_HEIGHT - popUpSize.top > 0);
  }, [popUpSize.top]);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(maxHeight, {
        toValue: 1,
        duration: ANIMATE_DURATION,
        useNativeDriver: false,
      }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIMATE_DURATION,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible]);

  const onLayout = (event: any) => {
    const maxH = Math.round(event.nativeEvent.layout?.height);
    if (viewHeight.one === 0) {
      setViewHeight({ one: maxH, all: maxH * options.length });
    }
  };

  const onItemSelect = (item: any) => {
    onModalClose();
    if (onSelectItem) onSelectItem(item);
  };

  const RenderListItem = useCallback(
    ({ item }: any) => (
      <Pressable onPress={() => onItemSelect(item)} onLayout={onLayout}>
        {renderItem && renderItem({ item })}
      </Pressable>
    ),
    [isVisible, options.length, onItemSelect]
  );

  const onModalClose = () => {
    closeAnimate();
    setTimeout(() => {
      onClose();
    }, ANIMATE_DURATION);
  };

  const closeAnimate = useCallback(() => {
    Animated.timing(maxHeight, {
      toValue: 0,
      duration: ANIMATE_DURATION,
      useNativeDriver: false,
    }).start();
    Animated.timing(translateY, {
      toValue: 1,
      duration: ANIMATE_DURATION,
      useNativeDriver: false,
    }).start();
  }, []);

  const heightInterpolate = maxHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, MAX_HEIGHT],
  });

  const transformInterpolate = [
    {
      translateY: translateY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, MAX_HEIGHT],
      }),
    },
  ];

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onModalClose}
      transparent
      animationType="none">
      <Pressable style={{ flex: 1 }} onPress={onModalClose}>
        <View
          style={[
            styles.popupContainer,
            {
              top: shouldShowAtBottom
                ? popUpSize.top + 5
                : popUpSize.top - MAX_HEIGHT + popUpSize.height,
              left,
              width,
            },
          ]}>
          {shouldShowAtBottom && (
            <TextInput
              defaultValue={inputPlaceholder}
              autoFocus
              style={[styles.inputStyle, styles.innerContainer, { height: 42 }]}
              placeholder={inputPlaceholder || 'Search'}
              onChangeText={onSearch}
            />
          )}
          <Animated.View
            style={{
              ...styles.innerContainer,
              marginTop: shouldShowAtBottom ? 5 : 0,
              marginBottom: shouldShowAtBottom ? 0 : 5,
              maxHeight: shouldShowAtBottom
                ? heightInterpolate
                : MAX_HEIGHT - popUpSize.height,
              transform: shouldShowAtBottom ? [] : transformInterpolate,
            }}>
            <FlatList
              style={{
                maxHeight: shouldShowAtBottom
                  ? Math.min(
                    MAX_HEIGHT,
                    screenHeight - (popUpSize.top + popUpSize.height * 2)
                  )
                  : MAX_HEIGHT,
              }}
              data={options}
              renderItem={RenderListItem}
              keyExtractor={(_, idx) => idx.toString()}
              ItemSeparatorComponent={Separator}
            />
          </Animated.View>
          {!shouldShowAtBottom && (
            <TextInput
              defaultValue={inputPlaceholder}
              autoFocus
              style={[styles.inputStyle, styles.innerContainer, { height: 42 }]}
              placeholder={inputPlaceholder || 'Search'}
              onChangeText={onSearch}
            />
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

export default DropdownModal;

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    paddingHorizontal: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
  },
  popupContainer: {
    alignSelf: 'stretch',
    position: 'absolute',
    overflow: 'hidden',
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  separator: {
    height: 1,
    backgroundColor: '#D3D3D3',
    opacity: 0.5,
  },
});
