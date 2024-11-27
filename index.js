import { registerRootComponent } from 'expo';

import App from './App';
import * as React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';



const theme = {
    ...DefaultTheme,
        colors: {
    primary: "rgb(186, 26, 32)",
    onPrimary: "rgb(255, 255, 255)",
    secondary: "rgb(121, 89, 0)",
    onSecondary: "rgb(255, 255, 255)",
                }
            }

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
