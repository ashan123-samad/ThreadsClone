import '../global.css';

import { AuthProvider } from "@/providers/AuthProvider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'white',
    card: '#101010',
  },
};

export default function RootLayout() {
  return (
     <SafeAreaProvider>

      <SafeAreaView
      style={{ flex: 1, backgroundColor: "black" }}
      edges={["top"]}
    >
      <ThemeProvider value={myTheme}>
        
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}