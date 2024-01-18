/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NativeModules} from 'react-native';

const {PythonModule} = NativeModules;

import {NavigationContainer} from '@react-navigation/native';
import ScreenRoutes from './src/route/routes';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

function App(): JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <ScreenRoutes />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
