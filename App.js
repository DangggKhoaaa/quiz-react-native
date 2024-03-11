import React from 'react';
import HomeScreen from "./home/HomeScreen";
import LoginScreen from "./home/LoginScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from "./home/SignupScreen";
import ClassName from "./home/ClassName";
import Subject from "./home/Subject";
import Quiz from "./home/Quiz";
import CreateQuestion from './home/CreateQuestion';
import RadioQuestion from './home/RadioQuestion';
import MyDrawer from './home/MyDrawer';
import CheckboxQuestion from './home/CheckboxQuestion';
import Chapter from './home/Chapter';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DrawerWrapper" component={MyDrawer} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Class" component={ClassName} />
        <Stack.Screen name="Subject" component={Subject} />
        <Stack.Screen name="Chapter" component={Chapter} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="CreateQuestion" component={CreateQuestion} />
        <Stack.Screen name="RadioQuestion" component={RadioQuestion} />
        <Stack.Screen name="CheckboxQuestion" component={CheckboxQuestion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


