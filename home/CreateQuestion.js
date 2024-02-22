import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateQuestion = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [token, setToken] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [numCorrectAnswers, setNumCorrectAnswers] = useState("");
    const [inputError, setInputError] = useState("");
    const isButtonDisabled = !!inputError;
    const data = route.params?.data;

    const handleMultipleAnswers = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

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

    const handleChangeText = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, '');
        const limitedText = cleanedText.slice(0, 1);
        const numValue = parseInt(limitedText, 10);

        if (isNaN(numValue) || numValue < 1 || numValue > 4) {
            setInputError("Số lượng câu đúng tối thiếu là 1 và tối đa là 4!");
            setNumCorrectAnswers("");
        } else {
            setInputError("");
            setNumCorrectAnswers(numValue.toString());
        }
    };

    const handleSubmit = () => {
        closeModal();
        navigation.navigate('CheckboxQuestion', { type: "checkbox", data, token, name, numCorrectAnswers });
    };

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RadioQuestion', { type: "radio", data, token, name })}>
                    <Text style={styles.buttonText}>Câu hỏi có 1 đáp án đúng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleMultipleAnswers}>
                    <Text style={styles.buttonText}>Câu hỏi có nhiều đáp án đúng</Text>
                </TouchableOpacity>
                <Modal visible={showModal} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Bạn muốn câu hỏi có bao nhiêu đáp án đúng?</Text>
                            <TextInput
                                style={[styles.input, inputError ? styles.inputError : ""]}
                                placeholder="Nhập số lượng đáp án đúng"
                                onChangeText={handleChangeText}
                                value={numCorrectAnswers}
                                keyboardType="numeric"
                            />
                            {inputError ? <Text style={styles.errorText}>{inputError}</Text> : ""}
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={[styles.button, isButtonDisabled ? styles.buttonDisabled : '']}
                                    onPress={handleSubmit}
                                    disabled={isButtonDisabled}
                                >
                                    <Text style={styles.buttonText}>Đồng ý</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={closeModal}>
                                    <Text style={styles.buttonText}>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        height: '50%',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    modalText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default CreateQuestion;