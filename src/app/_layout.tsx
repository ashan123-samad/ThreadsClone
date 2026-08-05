import "../lib/register-icons";
import "../global.css";

import { AuthProvider } from "@/providers/AuthProvider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'white',
    card: '#101010',
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
     <SafeAreaProvider>

      <SafeAreaView
      style={{ flex: 1, backgroundColor: "black" }}
      edges={["top"]}
    >
      <ThemeProvider value={myTheme}>
        <QueryClientProvider client={queryClient}>

        <AuthProvider>
          <Slot />
        </AuthProvider>
        </QueryClientProvider>
        
      </ThemeProvider>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}