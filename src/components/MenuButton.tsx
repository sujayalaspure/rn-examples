import { Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';

type Props = {
  title?: string;
  onPress?: () => void;
  showImage?: boolean;
  backdropOpacity?: number;
  src?: string;
};

const MenuButton = ({ title, onPress, showImage, backdropOpacity = 0.3, src }: Props) => (
  <Pressable onPress={onPress} style={styles.container}>
    {showImage && <Image style={[styles.imageThumbnail, { opacity: backdropOpacity }]} source={{ uri: src }} />}
    {title && (
      <Text numberOfLines={2} style={styles.text}>
        {title}
      </Text>
    )}
  </Pressable>
);

export default MenuButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#26619C',
    position: 'relative',
    height: 120,
    minWidth: 120,
    backgroundColor: '#003262',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
