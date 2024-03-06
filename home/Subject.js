import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { API_SUBJECT } from '../service/QuizService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Subject = () => {
    const [subjects, setSubjects] = useState([]);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();
    // const updatedAPIUrls = getUpdatedAPIUrls();

    const data = route.params?.data;

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

    useEffect(() => {
        axios(API_SUBJECT + data.id)
            .then(e => {
                setSubjects(e.data)
            }).catch(e =>
                setError(e.message)
            ).finally(() =>
                setIsLoading(false)
            );
    }, [data.id]);

    const handleSubjectId = (data) => {
        navigation.navigate('Quiz', { data });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            {
                subjects.length > 0 ?
                    <View>
                        <Text style={styles.title}>Vui lòng chọn môn học</Text>
                    </View>
                    :
                    <View>
                        <Text style={styles.title}>{error}</Text>
                    </View>
            }
            {
                isLoading ? <ActivityIndicator size={100} /> :
                    <FlatList
                        data={subjects}
                        renderItem={({ item }) =>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity key={item.id} style={styles.button} onPress={() => handleSubjectId(item)}>
                                    <Text style={styles.buttonText}>{item.subjectName + " " + data.className}</Text>
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
        width: 170
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default Subject;