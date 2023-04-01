import { View, Text, Button } from 'react-native';
import React from 'react';

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => (
  <View>
    <Text>HomeScreen</Text>
    <Button title="Go to Dropdown" onPress={() => navigation.navigate('Dropdown')} />
  </View>
);

export default HomeScreen;
