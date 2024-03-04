import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { API_CHANGE_PASSWORD } from '../service/QuizService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = yup.object().shape({
    oldPassword: yup.string()
        .required('Vui lòng nhập mật khẩu hiện tại')
        .matches(/^\S*$/, 'Tài khoản không được chứa ký tự trắng')
        .matches(/^[a-zA-Z0-9]+$/, 'Tài khoản chỉ được chứa chữ cái và số')
        .min(6, 'Tài khoản phải dài hơn 6 ký tự'),
    newPassword: yup.string()
        .required('Vui lòng nhập mật khẩu mới')
        .matches(/^\S*$/, 'Mật khẩu không được chứa ký tự trắng')
        .matches(/^[a-zA-Z0-9]+$/, 'Mật khẩu chỉ được chứa chữ cái và số')
        .min(6, 'Mật khẩu phải dài hơn 6 ký tự')
        .test('notSameAsOldPassword', 'Mật khẩu mới không được trùng với mật khẩu hiện tại', function (value) {
            const { oldPassword } = this.parent;
            return value !== oldPassword;
        }),
});

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showOldPassword, setShowOldPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [token, setToken] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem("token").then(e => {
            setToken(e)
        });
    }, []);

    const handleSubmit = (values) => {
        setIsLoading(false);
        axios.post(API_CHANGE_PASSWORD, values, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json',
            }
        })
            .then((e) => {
                Alert.alert('Thông báo', e.data, [
                    { text: 'OK', onPress: () => navigation.navigate('Trang chủ') },
                ], { textStyle: { fontSize: 30 } });
            }).catch(e => {
                Alert.alert('Thông báo', e.response.data, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ], { textStyle: { fontSize: 30 } });
            }).finally(() =>
                setIsLoading(true)
            );
    };

    const toggleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };
    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            {!isLoading ? <ActivityIndicator size={100} /> :
                <Formik
                    initialValues={{
                        oldPassword: '',
                        newPassword: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View style={styles.form}>
                            <View style={styles.form}>
                                <Text style={styles.label}>Mật khẩu hiện tại</Text>
                                <View style={styles.group}>
                                    <TextInput
                                        placeholder='Nhập mật khẩu hiện tại'
                                        style={styles.input}
                                        secureTextEntry={showOldPassword}
                                        onChangeText={handleChange('oldPassword')}
                                        value={values.oldPassword}
                                    />
                                    <TouchableOpacity onPress={toggleShowOldPassword}>
                                        {
                                            showOldPassword ?
                                                <Icon name="eye" size={25} color="gray" style={styles.icon} />
                                                :
                                                <Icon name="eye-slash" size={25} color="gray" style={styles.icon} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                {errors.oldPassword && <Text style={styles.errorText}>{errors.oldPassword}</Text>}
                            </View>
                            <View style={styles.form}>
                                <Text style={styles.label}>Mật khẩu mới</Text>
                                <View style={styles.group}>
                                    <TextInput
                                        placeholder='Nhập mật khẩu mới'
                                        style={styles.input}
                                        secureTextEntry={showNewPassword}
                                        onChangeText={handleChange('newPassword')}
                                        value={values.newPassword}
                                    />
                                    <TouchableOpacity onPress={toggleShowNewPassword}>
                                        {
                                            showNewPassword ?
                                                <Icon name="eye" size={25} color="gray" style={styles.icon} />
                                                :
                                                <Icon name="eye-slash" size={25} color="gray" style={styles.icon} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
                            </View>
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!isLoading}>
                                    <Text style={styles.buttonText}>Đổi mật khẩu</Text>
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
    form: {
        marginBottom: 20
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
        fontSize: 25,
    },
    group: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    input: {
        flex: 1,
        fontSize: 20,
    },
    errorText: {
        fontSize: 15,
        color: "red",
        marginBottom: 10
    },
    buttonGroup: {
        marginTop: 40,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default ChangePassword;