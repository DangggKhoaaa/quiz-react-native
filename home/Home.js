import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [token, setToken] = useState("");
    const [className, setClassName] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("name").then(e => {
            setName(e)
        });
        AsyncStorage.getItem("className").then(e => {
            setClassName(e)
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
            <Text style={styles.title}>
                Chào mừng{' '}
                <Text style={styles.name}>{name}</Text> đã đến với Quizz App của Trường THCS Vinh Hưng
            </Text>
            <Image source={require('../assets/logo.jpg')} style={styles.image} />
            <View>
                {
                    role === "ROLE_USER" ?
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Class')}>
                            <Text style={styles.buttonText}>Vào làm Quiz</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Class')}>
                            <Text style={styles.buttonText}>Tạo câu hỏi</Text>
                        </TouchableOpacity>
                }
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
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    name: {
        color: 'red',
        fontWeight: 'bold',
    },
    image: {
        width: "100%",
        height: "35%"
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default Home;