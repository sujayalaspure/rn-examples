import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigator';

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" />
    <Navigator />
  </NavigationContainer>
);

export default App;
