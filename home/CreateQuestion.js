import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateQuestion = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [token, setToken] = useState("");
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

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RadioQuestion', { type: "radio", data, token })}>
                    <Text style={styles.buttonText}>Câu hỏi có 1 đáp án đúng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Câu hỏi có nhiều đáp án đúng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    paragraph: {
        color: 'red'
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default CreateQuestion;