import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
const RadioButton = ({ selected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        <View
            style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selected ? '#007bff' : '#000',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
            }}
        >
            {selected && (
                <View
                    style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#007bff',
                    }}
                />
            )}
        </View>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default RadioButton;