import { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { customFont } from './src/ui/customFonts';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font'

import * as SplashScreen from 'expo-splash-screen';

import RootContainer from './src/app/RootContainer';
import List from './src/app/Movie/List';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAppReady] = useFonts(customFont)

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await new Promise(resolve => setTimeout(resolve, 100))
      await SplashScreen.hideAsync()
    }
  }, [isAppReady])

  if (!isAppReady) {
    return null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <RootContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='movie-db-list' component={List} />
        </Stack.Navigator>
      </RootContainer>
    </NavigationContainer>
  );
}