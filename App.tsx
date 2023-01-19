import { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { customFont } from './src/ui/customFonts';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font'

import * as SplashScreen from 'expo-splash-screen';

import RootContainer from './src/app/RootContainer';
import ListMovie from './src/app/Movie/List';
import DetailMovie from './src/app/Movie/Detail';


const linking = {
  prefixes: ['https://localhost:8000/', 'myapps://'],
  config: {
    screens: {
      "movie-db-list": {
        path: '/',
      },
      "movie-detail": {
        path: '/detail/:movieId',
        parse: {
          movieId: String,
        },
      }
    },
  },
};

export type RootStackParamList = {
  "movie-db-list": undefined
  "movie-detail": { movieId: number }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      setTimeout(() => {
        SplashScreen.hideAsync()
      }, 2000)
    }
  }, [isAppReady])

  if (!isAppReady) {
    return null
  }

  return (
    <NavigationContainer linking={linking} onReady={onLayoutRootView}>
      <RootContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white', flex: 1 },
           animation: 'none'
        }}>
          <Stack.Screen name='movie-db-list' component={ListMovie} />
          <Stack.Screen
            name="movie-detail"
            component={DetailMovie}
          />
        </Stack.Navigator>
      </RootContainer>
    </NavigationContainer>
  );
}