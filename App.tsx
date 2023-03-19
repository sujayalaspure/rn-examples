import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Dropdown from './src/projects/dropdown';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <KeyboardAvoidingView>
          <View
            style={{
              // justifyContent: 'flex-end',
              paddingVertical: 600,
              // height: '100%',
              // width: '100%',
              paddingHorizontal: 20,
            }}>
            <Dropdown />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
