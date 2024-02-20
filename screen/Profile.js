import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';


const Profile = () => {
    const [name, setName] = useState("");
    const [className, setClassName] = useState("");

    useEffect(() => {
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
                    <Text style={styles.label}>Tên: </Text>
                    <Text style={styles.value}>{name}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Lớp học: </Text>
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
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    value: {
        flex: 1,
    },
});

export default Profile;