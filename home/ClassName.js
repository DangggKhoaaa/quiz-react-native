import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_CLASS } from '../service/QuizService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClassName = () => {
    const [classList, setClassList] = useState([]);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();

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
        async function getAllClass() {
            axios(API_CLASS)
                .then(e => {
                    setClassList(e.data)
                }).catch(e => {
                    setError(e.message)
                }).finally(() =>
                    setIsLoading(false)
                );
        };
        getAllClass();
    }, []);

    const handleClassId = (data) => {
        navigation.navigate('Subject', { data });
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            {
                classList.length > 0 ?
                    <View>
                        <Text style={styles.title}>Vui lòng chọn lớp</Text>
                    </View>
                    :
                    <View>
                        <Text style={styles.title}>{error}</Text>
                    </View>
            }
            {isLoading ? <ActivityIndicator size={100} /> :
                <FlatList
                    data={classList}
                    renderItem={({ item }) =>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity key={item.id} style={styles.button} onPress={() => handleClassId(item)}>
                                <Text style={styles.buttonText}>{item.className}</Text>
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
        paddingTop: 70
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 50
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
    }
});

export default ClassName;