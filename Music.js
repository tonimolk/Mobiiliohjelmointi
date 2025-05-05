import { Text, Card, Button } from "react-native-paper";
import { ScrollView } from "react-native";
import WebView from "react-native-webview";
import { TouchableOpacity } from "react-native";
import { useState } from "react"; 
import { adaptNavigationTheme } from "react-native-paper";
import { DefaultTheme } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Linking } from "react-native";

const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });

const musicData = [
    { id: 1, title: 'Dancing Queen', artist: 'ABBA', link: 'https://www.youtube.com/embed/watch?v=xFrGuyw1V8s', lyrics: 'You can dance, you can jive, having the time of your life...' },
    { id: 2, title: 'Nothing Else Matters', artist: 'Metallica', link: 'https://www.youtube.com/embed/watch?v=tAGnKpE4NCI', lyrics: 'So close, no matter how far, couldn’t be much more from the heart...' },
    { id: 3, title: 'Cha Cha Cha', artist: 'Käärijä', link: 'https://www.youtube.com/embed/watch?v=G7KNmW9a75Y', lyrics: 'Rankka viikko ja paljpm pitkii päiviä takan...' },
];

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
                                name={favourites.some(item => item.id === song.id) ? 'heart' : 'heart-o'} 
                                size={24} 
                                color={favourites.some(item => item.id === song.id) ? 'red' : 'gray'} 
                                style={{ marginLeft: 8 }}
                            />
                        </TouchableOpacity>
                    </Card.Actions>
                </Card>
            ))}
        </ScrollView>
    );
}

export default MusicScreen;