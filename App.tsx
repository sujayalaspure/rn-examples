import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from './src/navigator';
import RNModal, { RNModalRef } from './src/components/RNModal';

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Navigator />
      <RNModal ref={RNModalRef} />
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default App;
