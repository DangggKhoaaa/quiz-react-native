import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_CREATE_QUESTION } from '../service/QuizService';

const validationSchema = yup.object().shape({
    question: yup.string().required('Vui lòng nhập câu hỏi'),
    answers: yup.array().of(
        yup.object().shape({
            content: yup.string().required('Vui lòng nhập câu trả lời')
        })
    )
});

const RadioQuestion = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const id = route.params.data.id;
    const token = route.params.token;

    console.log(route.params);

    const handleSubmit = (values) => {
        setIsLoading(false);
        axios.post(API_CREATE_QUESTION + id, values, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json',
            }
        })
            .then(() => {
                Alert.alert(
                    'Thông báo',
                    'Bạn đã tạo câu hỏi thành công!',
                    [
                        {
                            text: 'Tạo tiếp',
                            onPress: () => {
                                values.question = '';
                                values.answers.forEach((answer) => {
                                    answer.content = '';
                                });
                            },
                        },
                        {
                            text: 'Trở lại',
                            onPress: () => {
                                navigation.navigate('CreateQuestion');
                            },
                        },
                    ],
                    { textStyle: { fontSize: 30 } }
                );
            })
            .catch(e => {
                console.log(e.message);
            })
            .finally(() => setIsLoading(true));
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            <Text style={[styles.title, { color: 'red' }]}>Vui lòng nhập câu hỏi, câu trả lời theo hướng dẫn</Text>
            <ScrollView>
                <Formik
                    initialValues={{
                        answers: [
                            { content: '' },
                            { content: '' },
                            { content: '' },
                            { content: '' }
                        ],
                        question: '',
                        type: route.params?.type || ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                // validateOnChange={false}
                // validateOnBlur={false}
                >
                    {({ handleChange, handleSubmit, values, errors }) => (
                        <View style={styles.form}>
                            <Text style={styles.title}>Câu hỏi</Text>
                            <View style={styles.group}>
                                <Icon name="question" size={30} color="blue" style={styles.icon} />
                                <TextInput
                                    placeholder='Nhập câu hỏi tại đây'
                                    style={styles.input}
                                    onChangeText={handleChange('question')}
                                    value={values.question}
                                />
                            </View>
                            {errors.question && <Text style={styles.errorText}>{errors.question}</Text>}
                            <Text style={[styles.title, { marginTop: 30 }]}>Câu trả lời</Text>
                            <View style={styles.group}>
                                <Icon name="check" size={30} color="green" style={styles.icon} />
                                <TextInput
                                    placeholder='Nhập câu trả lời đúng tại đây'
                                    style={styles.input}
                                    onChangeText={handleChange('answers[0].content')}
                                    value={values.answers[0].content}
                                />
                            </View>
                            {errors.answers && errors.answers[0] && errors.answers[0].content && (
                                <Text style={styles.errorText}>{errors.answers[0].content}</Text>
                            )}
                            <View style={styles.group}>
                                <Icon name="close" size={30} color="red" style={styles.icon} />
                                <TextInput
                                    placeholder='Nhập câu trả lời sai tại đây'
                                    style={styles.input}
                                    onChangeText={handleChange('answers[1].content')}
                                    value={values.answers[1].content}
                                />
                            </View>
                            {errors.answers && errors.answers[1] && errors.answers[1].content && (
                                <Text style={styles.errorText}>{errors.answers[1].content}</Text>
                            )}
                            <View style={styles.group}>
                                <Icon name="close" size={30} color="red" style={styles.icon} />
                                <TextInput
                                    placeholder='Nhập câu trả lời sai tại đây'
                                    style={styles.input}
                                    onChangeText={handleChange('answers[2].content')}
                                    value={values.answers[2].content}
                                />
                            </View>
                            {errors.answers && errors.answers[2] && errors.answers[2].content && (
                                <Text style={styles.errorText}>{errors.answers[2].content}</Text>
                            )}
                            <View style={styles.group}>
                                <Icon name="close" size={30} color="red" style={styles.icon} />
                                <TextInput
                                    placeholder='Nhập câu trả lời sai tại đây'
                                    style={styles.input}
                                    onChangeText={handleChange('answers[3].content')}
                                    value={values.answers[3].content}
                                />
                            </View>
                            {errors.answers && errors.answers[3] && errors.answers[3].content && (
                                <Text style={styles.errorText}>{errors.answers[3].content}</Text>
                            )}
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={!isLoading}>
                                    <Text style={styles.buttonText}>Tạo câu hỏi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        paddingTop: 50,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
    },
    form: {
        marginBottom: 50
    },
    group: {
        marginTop: 20,
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: 'gray',
        height: 35
    },
    errorText: {
        fontSize: 15,
        color: "red",
        marginTop: 5,
        marginLeft: 70,
    },
    buttonGroup: {
        marginTop: 30,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default RadioQuestion;