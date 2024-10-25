// RootLayout.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/Store';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/Store';

SplashScreen.preventAutoHideAsync();

// function AuthLayout() {
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

//   if (!isLoggedIn) {
//       return <LoginScreen />;
//   }

//   return (
//       <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//       </Stack>
//   );
// }

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </Provider>
    );
}