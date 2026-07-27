import { Slot } from "expo-router";
import {ThemeProvider, DarkTheme} from "@react-navigation/native";

const myTheme = {
  ...DarkTheme,
  Colors: {
    ...DarkTheme.colors,
    primary: 'white',
  },
};



export default function RootLayout() {
  console.log('Root')

  return <ThemeProvider value={myTheme}>
     <Slot/>
    </ThemeProvider>
}