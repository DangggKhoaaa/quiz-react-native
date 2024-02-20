import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
const CheckboxButton = ({ selected, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.radioButton}>
            <View
                style={{
                    height: 24,
                    width: 24,
                    borderWidth: 2,
                    borderColor: selected ? '#007bff' : '#555',
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
                            backgroundColor: '#007bff',
                        }}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default CheckboxButton;