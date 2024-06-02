import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Linking, Button } from 'react-native';
import axios from 'axios';

export default function App() {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const apiKey = '882ab2ee2b7a489a9f05bfa2e855aa90';

    useEffect(() => {
        const fetchNews = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${page}`;
            const response = await axios.get(url);
            setArticles(response.data.articles);
            setTotalResults(response.data.totalResults);
        };
        fetchNews();
    }, [page]);

    const handlePrevClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page + 1 <= Math.ceil(totalResults / 20)) {
            setPage(page + 1);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.newsItem}>
            <Image source={{ uri: item.urlToImage || 'https://cdn.browshot.com/static/images/not-found.png' }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.button}>
                <Text style={styles.buttonText}>Read More</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>NewsStar Top Headlines</Text>
            <FlatList
                data={articles}
                renderItem={renderItem}
                keyExtractor={(item) => item.url}
                contentContainerStyle={styles.list}
            />
            <View style={styles.buttons}>
                <Button title="Previous" onPress={handlePrevClick} disabled={page <= 1} />
                <Button title="Next" onPress={handleNextClick} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        paddingBottom: 20,
    },
    newsItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        marginTop: 10,
    },
    description: {
        fontSize: 14,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
