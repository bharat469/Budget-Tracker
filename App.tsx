import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigations from './src/navigations';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import store from './src/helpers/redux/store';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <Provider store={store}>
          <NavigationContainer>
            <Navigations />
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
