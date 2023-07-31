import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenlist from './routes';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      {screenlist.map(screen => (
        <Stack.Screen key={screen.name} {...screen} />
      ))}
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default Navigator;
