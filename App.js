import React, { useState } from 'react'; 
import { View, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider, adaptNavigationTheme, Text, Card, Button } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';


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

function MusicScreen({ favourites = [], setFavourites = () => {} }) {
  const [visibleLyrics, setVisibleLyrics] = useState({});

  const Lyrics = (id) => {
    setVisibleLyrics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const Favourite = (song) => {
    if (favourites.some(item => item.id === song.id)) {
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

          <WebView
            source={{ uri: song.link }}
            style={{ height: 200, margin: 10 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
        />

          <Card.Actions>
            <Button onPress={() => Linking.openURL(song.link)}>Watch on YouTube</Button>
            <Button onPress={() => Lyrics(song.id)}>
              {visibleLyrics[song.id] ? 'Hide Lyrics' : 'Show Lyrics'}
            </Button>
            <TouchableOpacity onPress={() => Favourite(song)}>
            <FontAwesome 
              name={isFavourite(song.id) ? 'heart' : 'heart-o'} 
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

function FavouritesScreen({ favourites = [] }) {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Your Favourites</Text>
      {favourites.length === 0 ? (
        <Text>No favourites yet. ❤️</Text>
      ) : (
        favourites.map(song => (
          <Card key={song.id} style={{ marginBottom: 16 }}>
            <Card.Content>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{song.title}</Text>
              <Text style={{ fontSize: 14, color: 'gray' }}>{song.artist}</Text>
            </Card.Content>
            
          </Card>
        ))
      )}
    </ScrollView>
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

