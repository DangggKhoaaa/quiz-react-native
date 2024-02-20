import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { API_QUIZ } from '../service/QuizService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [token, setToken] = useState("");
    const route = useRoute();
    const navigation = useNavigation();

    const data = route.params?.data;

    useEffect(() => {
        axios(API_QUIZ + data.id)
            .then(e => {
                setQuizzes(e.data)
            }).catch(e =>
                setError(e.message)
            ).finally(() =>
                setIsLoading(false)
            );
    }, [data.id]);

    useEffect(() => {
        AsyncStorage.getItem("name").then(e => {
            setName(e)
        });
        AsyncStorage.getItem("role").then(e => {
            setRole(e)
        });
        AsyncStorage.getItem("token").then(e => {
            setToken(e)
        });
    }, []);

    const handleQuizId = (data) => {
        if (role === "ROLE_ADMIN") {
            navigation.navigate('CreateQuestion', { data })
        } else {
            navigation.navigate('Question', { data })
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            {
                quizzes.length > 0 ?
                    <View>
                        <Text style={styles.title}>Vui lòng chọn chương</Text>
                    </View>
                    :
                    <View>
                        <Text style={styles.title}>{error}</Text>
                    </View>
            }
            {
                isLoading ? <ActivityIndicator size={100} /> :
                    <FlatList
                        data={quizzes}
                        renderItem={({ item }) =>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity key={item.id} style={styles.button} onPress={() => handleQuizId(item)}>
                                    <Text style={styles.buttonText}>{data.subjectName + " - " + item.content}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
    },
    buttonGroup: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 30,
        width: 220
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default Quiz;