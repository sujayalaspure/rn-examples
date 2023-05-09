import { Button, ScrollView } from 'react-native';
import React from 'react';
import Dropdown from '../projects/dropdown';

type Props = {
  navigation: any;
};

const DropdownView = ({ navigation }: Props) => (
  <ScrollView>
    <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    <Dropdown />
  </ScrollView>
);

export default DropdownView;
