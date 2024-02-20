import React from 'react';
import { View, Text } from 'react-native';

const Loading = () => {
    return (
        <View>
            <View style={{ width: '100%', height: 200, backgroundColor: '#d4d4d4' }}>

            </View>
            <View>
                <Text style={{ width: '80%', height: 20, backgroundColor: '#d4d4d4' }}></Text>
            </View>
        </View>
    );
};

export default Loading;