import React from 'react'; 
import { View, ScrollView, Linking } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider, adaptNavigationTheme, Text, Card, Button } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Heart } from 'lucide-react-native';

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
const Tab = createBottomTabNavigator();

function HomeScreen({ }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function MusicScreen({ }) {
  const musicData = [
    { id: 1, title: 'Song 1', artist: 'Artist 1', link: 'https://www.youtube.com/watch?v=example1' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', link: 'https://www.youtube.com/watch?v=example2' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', link: 'https://www.youtube.com/watch?v=example3' },
  ];

  return (
    <ScrollView theme={LightTheme} style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Welcome to Music</Text>
      {musicData.map((song) => (
        <Card key={song.id} style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{song.title}</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>{song.artist}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => alert(`Playing ${song.title}`)}>Play</Button>
            <Button onPress={() => Linking.openURL(song.link)}>Watch on YouTube</Button>
            <Heart size={24} color="red" style={{ marginLeft: 8 }} />
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

function FavouritesScreen({ }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Favourites Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer theme={LightTheme}>
        <Tab.Navigator initialRouteName="Home"
          screenOptions={({ route }) => ({  
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
                return <AntDesign name={iconName} size={24} color="red" />;
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
          <Tab.Screen name="Music" component={MusicScreen} />
          <Tab.Screen name="Favourites" component={FavouritesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  ); 
}
