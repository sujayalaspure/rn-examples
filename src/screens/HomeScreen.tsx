import { View, Text, Button } from 'react-native';
import React from 'react';

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => (
  <View>
    <Text>HomeScreen</Text>
    <Button title="Go to Dropdown" onPress={() => navigation.navigate('Dropdown')} />
    <Button title="Go to Signin" onPress={() => navigation.navigate('Signin')} />
  </View>
);

export default HomeScreen;
