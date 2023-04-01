import { View, Button, ScrollView } from 'react-native';
import React from 'react';
import Dropdown from '../projects/dropdown';

type Props = {
  navigation: any;
};

const DropdownView = ({ navigation }: Props) => (
  <ScrollView>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    <View style={{ height: 100, backgroundColor: 'red' }} />
    <View style={{ height: 300, backgroundColor: 'white' }} />
    <Dropdown />
    <View style={{ height: 100, backgroundColor: 'white' }} />
    <View style={{ height: 200, backgroundColor: 'yellow' }} />
    <View style={{ height: 300, backgroundColor: 'red' }} />
  </ScrollView>
);

export default DropdownView;
