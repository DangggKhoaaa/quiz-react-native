import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import RadioButton from "./components/RadioButton";
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_QUESTION, API_SCORE } from '../service/QuizService';
import axios from 'axios';
import CheckboxButton from './components/CheckboxButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './Loading';

const Quiz = () => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [seconds, setSeconds] = useState(30);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [className, setClassName] = useState("");
    const [token, setToken] = useState("");
    const route = useRoute();
    const navigation = useNavigation();
    const data = route.params?.data;
    // const updatedAPIUrls = getUpdatedAPIUrls();

    const handlePress = (questionId, answerId) => {
        if (submitted) {
            return;
        };
        setSelectedAnswers(prevSelectedAnswers => {
            const updatedSelectedAnswers = [...prevSelectedAnswers];
            const existingAnswer = updatedSelectedAnswers.find(answer => answer.questionId === questionId);

            if (questions.find(question => question.id === questionId)?.type === 'radio') {
                if (existingAnswer) {
                    existingAnswer.answerId = [answerId];
                } else {
                    updatedSelectedAnswers.push({ questionId, answerId: [answerId] });
                }
            } else {
                if (existingAnswer) {
                    const isSelected = existingAnswer.answerId.includes(answerId);
                    if (isSelected) {
                        existingAnswer.answerId = existingAnswer.answerId.filter(id => id !== answerId);
                    } else {
                        existingAnswer.answerId.push(answerId);
                    }
                } else {
                    updatedSelectedAnswers.push({ questionId, answerId: [answerId] });
                }
            }
            return updatedSelectedAnswers;
        });
    };

    useEffect(() => {
        if (!isLoading) {
            if (seconds > 0 && !submitted) {
                const timer = setTimeout(() => {
                    setSeconds(seconds - 1);
                }, 1000);

                return () => clearTimeout(timer);
            } else if (seconds === 0 && questions.length > 0) {
                handleSubmit();
            };
        }
    }, [seconds, isLoading]);

    useEffect(() => {
        AsyncStorage.getItem("name").then(e => {
            setName(e)
        });
        AsyncStorage.getItem("className").then(e => {
            setClassName(e)
        });
        AsyncStorage.getItem("token").then(e => {
            setToken(e)
        });
    }, []);

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    };

    const getAllQuestion = () => {
        axios(API_QUESTION + data.id, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json',
            }
        })
            .then(e => {
                setQuestions(e.data);
            }).catch(e =>
                setError(e.message)
            ).finally(() =>
                setIsLoading(false)
            );
    }

    useEffect(() => {
        getAllQuestion();
    }, [data.id]);

    const handleSubmit = () => {
        if (selectedAnswers.length === 0 && seconds > 0) {
            if (!showAlert) {
                setShowAlert(true);
                Alert.alert('Cảnh báo', 'Bạn phải chọn ít nhất 1 câu trả lời!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ], { textStyle: { fontSize: 30 } });
            }
        } else {
            axios.post(API_SCORE, { selectedAnswers, totalQuestion: questions.length })
                .then(response => {
                    if (!showAlert) {
                        setShowAlert(true);
                        Alert.alert('Thông báo', `${name} lớp ${className} đã được ${response.data.score} điểm!`, [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ], { textStyle: { fontSize: 30 } });
                        setScore(response.data.score);
                    }
                })
                .catch(error => {
                    Alert.alert('Thông báo', error.message, [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ], { textStyle: { fontSize: 30 } });
                })
                .finally(() => {
                    setSeconds(-1);
                    setSubmitted(true);
                });
        }
    };

    const handleRetry = () => {
        setSelectedAnswers([]);
        setScore(0);
        setSeconds(30);
        setIsLoading(true);
        setSubmitted(false);
        setShowAlert(false);
        getAllQuestion();
    };

    console.log(questions.length);

    return (
        <SafeAreaView style={styles.container}>
            {
                questions.length > 0 ?
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.title}>{data.content}</Text>
                        <View style={styles.group}>
                            <Icon name="user" size={30} color="blue" style={styles.icon} />
                            <Text style={styles.textInfo}>{name}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.group}>
                                <Icon name="book" size={30} color="green" style={styles.icon} />
                                <Text style={styles.textInfo}>{"Lớp " + className}</Text>
                            </View>
                            {
                                submitted ?
                                    <View style={styles.group}>
                                        <Text style={styles.textInfo}>{"Điểm: "}</Text>
                                        <Text style={[styles.textInfo, { color: score < 5 ? 'red' : score >= 5 && score <= 7 ? 'blue' : 'green' }]}>
                                            {score}
                                        </Text>
                                    </View>
                                    :
                                    <View style={styles.group}>
                                        <Icon name="clock-o" size={30} color="red" style={styles.icon} />
                                        <Text style={styles.textInfo}>{formatTime(seconds)}</Text>
                                    </View>
                            }
                        </View>
                    </View>
                    :
                    <View>
                        <Text style={[styles.title, { marginBottom: '20%' }]}>{error || 'Không có dữ liệu'}</Text>
                    </View>
            }
            {
                isLoading ? (
                    Array.from({ length: 5 }, (_, index) => (
                        <Loading
                            key={index}
                        />
                    ))
                ) :
                    <FlatList
                        data={questions}
                        renderItem={({ item: question, index }) => (
                            <View style={styles.body}>
                                <Text style={[styles.text, { fontWeight: 'bold', padding: 10 }]}>
                                    {"Câu " + (index + 1) + ": " + question.content}
                                </Text>
                                {
                                    question.type === "radio" ?
                                        <Text style={[styles.text, { marginLeft: 20 }]}>Chọn một</Text>
                                        :
                                        <Text style={[styles.text, { marginLeft: 20 }]}>Chọn một hoặc nhiều</Text>
                                }
                                <FlatList
                                    data={question.answerList}
                                    renderItem={({ item: answer }) => (
                                        <View style={styles.group}>
                                            {question.type === "radio" ?
                                                <RadioButton
                                                    selected={selectedAnswers?.find(e => e.questionId === question.id)?.answerId[0] === answer.id}
                                                    onPress={() => handlePress(question.id, answer.id)}
                                                />
                                                :
                                                <CheckboxButton
                                                    selected={selectedAnswers?.find(e => e.questionId === question.id)?.answerId?.includes(answer.id)}
                                                    onPress={() => handlePress(question.id, answer.id)}
                                                />
                                            }
                                            <Text style={styles.text}>{answer.content}</Text>
                                        </View>
                                    )}
                                    keyExtractor={answer => answer.id}
                                />
                            </View>
                        )}
                        keyExtractor={question => question.id}
                        ListFooterComponent={() => (
                            questions.length > 0 ?
                                <View>
                                    {
                                        submitted ?
                                            <View style={styles.buttonGroup}>
                                                <TouchableOpacity style={styles.button} onPress={handleRetry}>
                                                    <Icon name="repeat" size={25} color="#fff" style={[styles.icon, { marginBottom: 0 }]} />
                                                    <Text style={styles.buttonText}>Làm lại</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DrawerWrapper')}>
                                                    <Icon name="home" size={25} color="#fff" style={[styles.icon, { marginBottom: 0 }]} />
                                                    <Text style={styles.buttonText}>Trang chủ</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View style={styles.buttonGroup}>
                                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                                    <Icon name="send" size={25} color="#fff" style={[styles.icon, { marginBottom: 0 }]} />
                                                    <Text style={styles.buttonText}>Nộp bài</Text>
                                                </TouchableOpacity>
                                            </View>
                                    }
                                </View>
                                :
                                ""
                        )}
                    />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    body: {
        paddingLeft: 0,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 20
    },
    textInfo: {
        fontSize: 25,
    },
    text: {
        fontSize: 20,
    },
    icon: {
        marginRight: 15
    },
    group: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 25,
        marginRight: 20,
        marginTop: 10,
    },
    buttonGroup: {
        flex: 1,
        justifyContent: "space-around",
        flexDirection: "row",
        margin: 20,
        alignItems: 'center',
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
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

export default Quiz;