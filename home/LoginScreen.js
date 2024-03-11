import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { API_LOGIN } from '../service/QuizService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = yup.object().shape({
    username: yup.string()
        .required('Vui lòng nhập tài khoản')
        .matches(/^\S*$/, 'Tài khoản không được chứa ký tự trắng')
        .matches(/^[a-zA-Z0-9]+$/, 'Tài khoản chỉ được chứa chữ cái và số')
        .min(6, 'Tài khoản phải dài hơn 6 ký tự'),
    password: yup.string()
        .required('Vui lòng nhập mật khẩu')
        .matches(/^\S*$/, 'Mật khẩu không được chứa ký tự trắng')
        .matches(/^[a-zA-Z0-9]+$/, 'Mật khẩu chỉ được chứa chữ cái và số')
        .min(6, 'Mật khẩu phải dài hơn 6 ký tự'),
});

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation();
    // const updatedAPIUrls = getUpdatedAPIUrls();

    const handleSubmit = (values) => {
        setIsLoading(false);
        axios.post(API_LOGIN, values)
            .then((e) => {
                if (e.data.success) {
                    AsyncStorage.setItem('role', e.data.userDetail.role || "");
                    AsyncStorage.setItem('name', e.data.userDetail.name || "");
                    AsyncStorage.setItem('school', e.data.userDetail.school || "");
                    AsyncStorage.setItem('className', e.data.userDetail.className || "");
                    AsyncStorage.setItem('username', e.data.userDetail.username || "");
                    AsyncStorage.setItem('token', e.data.userDetail.token || "");
                    navigation.navigate('DrawerWrapper');
                } else {
                    Alert.alert('Thông báo', e.data.message, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ], { textStyle: { fontSize: 30 } });
                }
            }).catch(e => {
                Alert.alert('Thông báo', e.message, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ], { textStyle: { fontSize: 30 } });
            }).finally(() =>
                setIsLoading(true)
            );
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            <View>
                <Text style={styles.title}>Đăng Nhập</Text>
            </View>
            {!isLoading ? <ActivityIndicator size={100} /> :
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View style={styles.form}>
                            <View style={styles.group}>
                                <Icon name="user" size={30} color="gray" style={styles.icon} />
                                <TextInput
                                    placeholder='Tài khoản'
                                    style={styles.input}
                                    onChangeText={handleChange('username')}
                                    value={values.username}
                                />
                            </View>
                            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                            <View style={styles.group}>
                                <Icon name="lock" size={30} color="gray" style={styles.icon} />
                                <TextInput
                                    placeholder='Mật khẩu'
                                    style={styles.input}
                                    secureTextEntry={showPassword}
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                />
                                <TouchableOpacity onPress={toggleShowPassword}>
                                    {
                                        showPassword ?
                                            <Icon name="eye" size={25} color="gray" style={styles.icon} />
                                            :
                                            <Icon name="eye-slash" size={25} color="gray" style={styles.icon} />
                                    }
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!isLoading}>
                                    <Text style={styles.buttonText}>Đăng nhập</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={[styles.button, { backgroundColor: 'red', flexDirection: 'row' }]}>
                            <Icon name="google" size={30} color="white" style={styles.icon} />
                            <Text style={styles.buttonText}>Google</Text>
                        </TouchableOpacity> */}
                            </View>
                        </View>
                    )}
                </Formik>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        paddingHorizontal: 50
    },
    title: {
        fontSize: 35,
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold'
    },
    form: {
        marginBottom: 50
    },
    group: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 20,
    },
    errorText: {
        fontSize: 15,
        color: "red",
        marginTop: 5
    },
    buttonGroup: {
        marginTop: 40,
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default LoginScreen;