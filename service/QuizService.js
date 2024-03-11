import Constants from 'expo-constants';
import * as Network from 'expo-network';
import * as Linking from 'expo-linking';
import NetInfo from '@react-native-community/netinfo';

// const getIPAddress = async () => {
//     const ipAddres = await Network.getNetworkStateAsync();
//     console.log(ipAddres);
//     return ipAddres;
// };

// getIPAddress();

// NetInfo.fetch().then((state) => {
//     console.log('IP Address:', state.details.ipAddress);
// });

const IP = "http://192.168.1.45:8080/";
export const API_CLASS = IP + "api/client/classes";
export const API_SUBJECT = IP + "api/client/subjects/";
export const API_QUIZ = IP + "api/client/quizzes/";
export const API_QUESTION = IP + "api/client/questions/";
export const API_CREATE_QUESTION = IP + "api/admin/questions/radio/";
export const API_CREATE_QUESTION_CHECKBOX = IP + "api/admin/questions/checkbox/";
export const API_SCORE = IP + "api/client/userQuiz";
export const API_REGISTER = IP + "api/auth/register";
export const API_LOGIN = IP + "api/auth/login";
export const API_CHANGE_PASSWORD = IP + "api/auth/changePassword";

// const getIPAddress = () => {
//     const ipAddress = Constants.experienceUrl;
//     console.log(ipAddress);
//     const regex = /(\d+\.\d+\.\d+\.\d+)/;
//     const match = ipAddress.match(regex);
//     const extractedIP = match ? match[0] : null;
//     console.log(extractedIP);
//     return ipAddress;
// };

// const getIPAddress = () => {
//     const ipAddres = Constants.experienceUrl;
//     const ipAddress = Linking.openURL(ipAddres);
//     console.log(ipAddress);
//     return ipAddress;
// };

// export const getUpdatedAPIUrls = () => {
//     const ipAddress = getIPAddress();
//     if (ipAddress) {
//         const updatedIP = `http://${ipAddress}:8080`;
//         const updatedAPIUrls = {
//             API_CLASS: updatedIP + "/api/client/classes",
//             API_SUBJECT: updatedIP + "/api/client/subjects/",
//             API_QUIZ: updatedIP + "/api/client/quizzes/",
//             API_QUESTION: updatedIP + "/api/client/questions/",
//             API_CREATE_QUESTION: updatedIP + "/api/admin/questions/radio/",
//             API_CREATE_QUESTION_CHECKBOX: updatedIP + "/api/admin/questions/checkbox/",
//             API_SCORE: updatedIP + "/api/client/userQuiz",
//             API_REGISTER: updatedIP + "/api/auth/register",
//             API_LOGIN: updatedIP + "/api/auth/login",
//             API_LOGIN_GG: updatedIP + "/api/auth/loginGoogle",
//             API_CHANGE_PASSWORD: updatedIP + "/api/auth/changePassword",
//         };
//         return updatedAPIUrls;
//     } else {
//         console.error('Không thể lấy địa chỉ IP');
//         return null;
//     }
// };
