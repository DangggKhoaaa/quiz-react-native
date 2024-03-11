import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';

const Profile = () => {
    const [school, setSchool] = useState("");
    const [name, setName] = useState("");
    const [className, setClassName] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("school").then(e => {
            setSchool(e)
        });
        AsyncStorage.getItem("name").then(e => {
            setName(e)
        });
        AsyncStorage.getItem("className").then(e => {
            setClassName(e)
        });
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            <View>
                <Text style={styles.title}>Thông tin cá nhân</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Trường: </Text>
                    <Text style={styles.value}>{school}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Tên: </Text>
                    <Text style={styles.value}>{name}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Lớp: </Text>
                    <Text style={styles.value}>{className}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
        fontSize: 20,
    },
    value: {
        flex: 1,
        fontSize: 20,
    },
});

export default Profile;