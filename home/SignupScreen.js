import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_REGISTER } from '../service/QuizService';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const validationSchema = yup.object().shape({
    school: yup.string().required('Vui lòng nhập tên trường'),
    name: yup.string().required('Vui lòng nhập họ và tên'),
    className: yup.string()
        .required('Vui lòng nhập lớp')
        .matches(/^(1[0-2]|[1-9])$/, 'Lớp phải là số từ 1 đến 12'),
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

const SignupScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation();
    // const updatedAPIUrls = getUpdatedAPIUrls();

    const handleSubmit = (values) => {
        setIsLoading(false);
        axios.post(API_REGISTER, values)
            .then(() => {
                Alert.alert(
                    'Thông báo',
                    'Đăng ký thành công!',
                    [
                        {
                            text: 'Đăng nhập',
                            onPress: () => {
                                navigation.navigate('Login');
                            },
                        },
                    ],
                    { textStyle: { fontSize: 30 } }
                );
            }).catch(e => {
                Alert.alert('Thông báo', e.response.data, [
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
                <Text style={styles.title}>Đăng Ký</Text>
            </View>
            {
                !isLoading ? <ActivityIndicator size={100} /> :
                    <Formik
                        initialValues={{
                            school: '',
                            name: '',
                            className: '',
                            username: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                        {({ handleChange, handleSubmit, values, errors }) => (
                            <View style={styles.form}>
                                <View style={styles.group}>
                                    <Icon name="university" size={30} color="gray" style={styles.icon} />
                                    <TextInput
                                        placeholder='Trường'
                                        style={styles.input}
                                        onChangeText={handleChange('school')}
                                        value={values.school}
                                    />
                                </View>
                                {errors.school && <Text style={styles.errorText}>{errors.school}</Text>}
                                <View style={styles.group}>
                                    <Icon name="mortar-board" size={28} color="gray" style={styles.icon} />
                                    <TextInput
                                        placeholder='Họ và tên'
                                        style={styles.input}
                                        onChangeText={handleChange('name')}
                                        value={values.name}
                                    />
                                </View>
                                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                                <View style={styles.group}>
                                    <Icon name="book" size={30} color="gray" style={styles.icon} />
                                    <TextInput
                                        placeholder='Lớp'
                                        style={styles.input}
                                        onChangeText={handleChange('className')}
                                        value={values.className}
                                    />
                                </View>
                                {errors.className && <Text style={styles.errorText}>{errors.className}</Text>}
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
                                        <Text style={styles.buttonText}>Đăng ký</Text>
                                    </TouchableOpacity>
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
        marginRight: 15,
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
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default SignupScreen;