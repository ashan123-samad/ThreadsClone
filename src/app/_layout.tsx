import '../global.css';

import { Slot } from "expo-router";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
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
        <Slot />
      </ThemeProvider>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}