import { View, Button } from 'react-native';
import React from 'react';
import screenlist from '../navigator/routes';
// import * as screenList from '.';

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => (
  <View>
    {screenlist.map(({ id, name }) => (
      <Button key={id} title={`Go to ${name}`} onPress={() => navigation.navigate(name)} />
    ))}
  </View>
);

export default HomeScreen;
