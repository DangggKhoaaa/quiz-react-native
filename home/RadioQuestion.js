import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_CREATE_QUESTION } from '../service/QuizService';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

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
    // const updatedAPIUrls = getUpdatedAPIUrls();
    const id = route.params.data.id;
    const token = route.params.token;
    const [isLoading, setIsLoading] = useState(true);
    const [row, setRow] = useState(1);
    const [prevName, setPrevName] = useState('');
    const [formData, setFormData] = useState({
        answers: [
            { content: '' },
            { content: '' },
            { content: '' },
            { content: '' }
        ],
        question: '',
        type: route.params?.type || '',
        creator: route.params?.name
    });


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
                            text: 'Trang chủ',
                            onPress: () => {
                                navigation.navigate('DrawerWrapper');
                            },
                        },
                    ],
                    { textStyle: { fontSize: 30 } }
                );
            })
            .catch(e => {
                Alert.alert('Thông báo', e.message, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ], { textStyle: { fontSize: 30 } });
            })
            .finally(() => {
                setIsLoading(true);
            });
    };

    const readExcelData = async (fileUri, index) => {
        try {
            if (!fileUri) {
                Alert.alert('Thông báo', 'Đường dẫn tệp Excel không hợp lệ.', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ], { textStyle: { fontSize: 30 } });
                return;
            }

            if (!fileUri.endsWith('.xlsx')) {
                Alert.alert('Thông báo', 'Định dạng tệp không được hỗ trợ. Vui lòng chọn một tệp excel', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ], { textStyle: { fontSize: 30 } });
                return;
            }

            const content = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const workbook = XLSX.read(content, { type: 'base64' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const question = data[index][0];
            const answers = data[index].slice(1, 5);

            setFormData({
                ...formData,
                question: String(question),
                answers: [
                    { content: String(answers[0]) },
                    { content: String(answers[1]) },
                    { content: String(answers[2]) },
                    { content: String(answers[3]) },
                ],
            });
        } catch (error) {
            Alert.alert('Lỗi khi đọc tệp Excel', error.message, [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ], { textStyle: { fontSize: 30 } });
        }
    };

    const handleFilePick = async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: true,
                multiple: false,
            });
            if (!res.canceled) {
                let newRow;
                if (res.assets[0].name.localeCompare(prevName) === 0) {
                    newRow = row + 1;
                    setRow(newRow);
                } else {
                    newRow = 1;
                    setRow(newRow);
                    setPrevName(res.assets[0].name);
                }
                readExcelData(res.assets[0].uri, newRow);
            } else {
                Alert.alert('Thông báo', 'Không chọn file', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ], { textStyle: { fontSize: 30 } });
            }
        } catch (error) {
            Alert.alert('Lỗi khi chọn file', error.message, [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ], { textStyle: { fontSize: 30 } });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
            <Text style={[styles.title, { color: 'red' }]}>Vui lòng nhập câu hỏi, câu trả lời theo hướng dẫn</Text>
            <View style={[styles.buttonGroup, { alignItems: 'flex-end', marginRight: "5%" }]}>
                <TouchableOpacity style={[styles.button, { backgroundColor: "green" }]} onPress={handleFilePick}>
                    <Text><Icon name="file-excel-o" size={25} color="#fff" style={styles.icon} /></Text>
                </TouchableOpacity>
            </View>
            {!isLoading ? <ActivityIndicator size={100} /> :
                <ScrollView>
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    // validateOnChange={false}
                    // validateOnBlur={false}
                    >
                        {({ handleChange, handleSubmit, values, errors, setValues }) => {
                            useEffect(() => {
                                setValues(formData)
                            }, [formData])
                            return (
                                <View style={styles.form}>
                                    <Text style={styles.title}>Câu hỏi</Text>
                                    <View style={styles.group}>
                                        <TextInput
                                            placeholder='Nhập câu hỏi tại đây'
                                            style={styles.input}
                                            onChangeText={handleChange('question')}
                                            value={values.question}
                                        />
                                        <Icon name="question" size={30} color="blue" style={styles.icon} />
                                    </View>
                                    {errors.question && <Text style={styles.errorText}>{errors.question}</Text>}
                                    <Text style={[styles.title, { marginTop: 30 }]}>Câu trả lời</Text>
                                    <View style={styles.group}>
                                        <TextInput
                                            placeholder='Nhập câu trả lời đúng tại đây'
                                            style={styles.input}
                                            onChangeText={handleChange('answers[0].content')}
                                            value={values.answers[0].content}
                                        />
                                        <Icon name="check" size={30} color="green" style={styles.icon} />
                                    </View>
                                    {errors.answers && errors.answers[0] && errors.answers[0].content && (
                                        <Text style={styles.errorText}>{errors.answers[0].content}</Text>
                                    )}
                                    <View style={styles.group}>
                                        <TextInput
                                            placeholder='Nhập câu trả lời sai tại đây'
                                            style={styles.input}
                                            onChangeText={handleChange('answers[1].content')}
                                            value={values.answers[1].content}
                                        />
                                        <Icon name="close" size={30} color="red" style={styles.icon} />
                                    </View>
                                    {errors.answers && errors.answers[1] && errors.answers[1].content && (
                                        <Text style={styles.errorText}>{errors.answers[1].content}</Text>
                                    )}
                                    <View style={styles.group}>
                                        <TextInput
                                            placeholder='Nhập câu trả lời sai tại đây'
                                            style={styles.input}
                                            onChangeText={handleChange('answers[2].content')}
                                            value={values.answers[2].content}
                                        />
                                        <Icon name="close" size={30} color="red" style={styles.icon} />
                                    </View>
                                    {errors.answers && errors.answers[2] && errors.answers[2].content && (
                                        <Text style={styles.errorText}>{errors.answers[2].content}</Text>
                                    )}
                                    <View style={styles.group}>
                                        <TextInput
                                            placeholder='Nhập câu trả lời sai tại đây'
                                            style={styles.input}
                                            onChangeText={handleChange('answers[3].content')}
                                            value={values.answers[3].content}
                                        />
                                        <Icon name="close" size={30} color="red" style={styles.icon} />
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
                            )
                        }
                        }
                    </Formik>
                </ScrollView>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
    },
    form: {
        marginTop: 20
    },
    group: {
        marginTop: 20,
        marginLeft: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
    },
    icon: {
        margin: 10,
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
        marginLeft: 35,
    },
    buttonGroup: {
        marginTop: 20,
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