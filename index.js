import * as React from 'react';
import { AppRegistry } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';

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

AppRegistry.registerComponent(appName, () => Main);