import React, { useState } from 'react'; 
import { View, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider, adaptNavigationTheme, Text, Card, Button } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FavouritesScreen from './Favourites'
import MusicScreen from './Music';

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
const Tab = createBottomTabNavigator();

const musicData = [
  { id: 1, title: 'Dancing Queen', artist: 'ABBA', link: 'https://www.youtube.com/embed/watch?v=xFrGuyw1V8s', lyrics: 'You can dance, you can jive, having the time of your life...' },
  { id: 2, title: 'Nothing Else Matters', artist: 'Metallica', link: 'https://www.youtube.com/embed/watch?v=tAGnKpE4NCI', lyrics: 'So close, no matter how far, couldn’t be much more from the heart...' },
  { id: 3, title: 'Cha Cha Cha', artist: 'Käärijä', link: 'https://www.youtube.com/embed/watch?v=G7KNmW9a75Y', lyrics: 'Cha cha cha, en haluu olla yksin...' },
];

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Home Screen</Text>
    </View>
  );
}



export default function App() {
  const [favourites, setFavourites] = useState([]);

  return (
    <PaperProvider>
      <NavigationContainer theme={LightTheme}>
        <Tab.Navigator initialRouteName="Home"
          screenOptions={({ route }) => ({  
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
                return <FontAwesome name={iconName} size={24} color="red" />;
              } else if (route.name === 'Music') {
                iconName = 'music';
                return <FontAwesome name={iconName} size={24} color="red" />;
              } else if (route.name === 'Favourites') {
                iconName = 'heart';
                return <FontAwesome name={iconName} size={24} color="red" />;
              }
            },
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Music">
            {() => <MusicScreen favourites={favourites} setFavourites={setFavourites} />}
          </Tab.Screen>
          <Tab.Screen name="Favourites">
            {() => <FavouritesScreen favourites={favourites} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  ); 
}
