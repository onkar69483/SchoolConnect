import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    const router = useRouter();

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    // Register for push notifications
    useEffect(() => {
        registerForPushNotificationsAsync();

        const subscription = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log("Notification Received:", notification);
            }
        );

        const responseSubscription =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    // Navigate to the notices page when the notification is tapped
                    router.push("/notices");
                }
            );

        return () => {
            subscription.remove();
            responseSubscription.remove();
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Push Notification Token:", token);
        return token;
    }

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
