import { ScrollView, Text } from "react-native";
import WebView from "react-native-webview";
import { Card } from "react-native-paper";
import { useState } from "react";

function FavouritesScreen({ favourites = [] }) {
    const [visibleLyrics, setVisibleLyrics] = useState({});

    const toggleLyrics = (id) => {
        setVisibleLyrics(prev => ({ ...prev, [id]: !prev[id] }));
    };

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
                            <Text onPress={() => toggleLyrics(song.id)} style={{ color: 'blue', marginTop: 10 }}>
                                {visibleLyrics[song.id] ? 'Hide Lyrics' : 'Show Lyrics'}
                            </Text>
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
                    </Card>
                ))
            )}
        </ScrollView>
    );
}

export default FavouritesScreen;