import React from 'react'; 
import { View, ScrollView, Linking } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider, adaptNavigationTheme, Text, Card, Button } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
const Tab = createBottomTabNavigator();

function HomeScreen({ }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function MusicScreen({favourites, setFavourites }) {
  const musicData = [
    { id: 1, title: 'Dancing Queen', artist: 'Abba', link: 'https://www.youtube.com/watch?v=xFrGuyw1V8s' },
    { id: 2, title: 'Nothing else matters', artist: 'Metallica', link: 'https://www.youtube.com/watch?v=tAGnKpE4NCI' },
    { id: 3, title: 'Cha Cha Cha', artist: 'Käärijä', link: 'https://www.youtube.com/watch?v=G7KNmW9a75Y' },
  ];

  
    const [visibleLyrics, setVisibleLyrics] = useState({});
  
    const toggleLyrics = (id) => {
      setVisibleLyrics(prev => ({ ...prev, [id]: !prev[id] }));
    };
  
    const toggleFavourite = (song) => {
      if (favourites.find(item => item.id === song.id)) {
        setFavourites(prev => prev.filter(item => item.id !== song.id));
      } else {
        setFavourites(prev => [...prev, song]);
      }
    };
  
    const isFavourite = (id) => favourites.some(song => song.id === id);
  
    return (
      <ScrollView theme={LightTheme} style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Welcome to Music</Text>
        {musicData.map((song) => (
          <Card key={song.id} style={{ marginBottom: 16 }}>
            <Card.Content>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{song.title}</Text>
              <Text style={{ fontSize: 14, color: 'gray' }}>{song.artist}</Text>
              {visibleLyrics[song.id] && (
                <Text style={{ marginTop: 10 }}>{song.lyrics}</Text>
              )}
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => alert(`Playing ${song.title}`)}>Play</Button>
              <Button onPress={() => Linking.openURL(song.link)}>Watch on YouTube</Button>
              <Button onPress={() => toggleLyrics(song.id)}>
                {visibleLyrics[song.id] ? 'Hide Lyrics' : 'Show Lyrics'}
              </Button>
              <TouchableOpacity onPress={() => toggleFavourite(song)}>
                <FontAwesome 
                  name="heart" 
                  size={24} 
                  color={isFavourite(song.id) ? 'red' : 'gray'} 
                  style={{ marginLeft: 8 }} 
                />
              </TouchableOpacity>
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
