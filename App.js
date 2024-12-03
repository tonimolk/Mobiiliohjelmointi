import React from 'react';
import { View, Button} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function MusicScreen({ navigation }) {
  return (
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'space-around' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer theme={LightTheme}>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Music" component={MusicScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  ); 
}