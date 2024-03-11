import React from 'react';
import { View, Text } from 'react-native';

const Loading = () => {
    return (
        <View style={{ margin: 10 }}>
            <View style={{ marginBottom: 15 }}>
                <Text style={{ width: '100%', height: 80, backgroundColor: '#d4d4d4', borderRadius: 5 }}></Text>
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ width: '20%', height: 20, backgroundColor: '#d4d4d4', borderRadius: 5 }}></Text>
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ width: '80%', height: 20, backgroundColor: '#d4d4d4', borderRadius: 5 }}></Text>
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ width: '80%', height: 20, backgroundColor: '#d4d4d4', borderRadius: 5 }}></Text>
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ width: '80%', height: 20, backgroundColor: '#d4d4d4', borderRadius: 5 }}></Text>
            </View>
            <View style={{ margin: 10 }}>
                <Text style={{ width: '80%', height: 20, backgroundColor: '#d4d4d4', borderRadius: 5 }}></Text>
            </View>
        </View>
    );
};

export default Loading;