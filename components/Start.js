import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInAnonymously } from 'firebase/auth'; // Import Firebase authentication methods

const Start = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const image = require('../assets/bg.png');
    const auth = getAuth();

    const handleStartChat = () => {
        if (name.trim() !== '') {
            // Log in the user anonymously
            signInAnonymously(auth)
                .then((userCredential) => {
                    const userId = userCredential.user.uid;
                    // Navigate to the chat screen with the provided name and selected color
                    navigation.navigate('Chat', { name, selectedColor, userId });
                })
                .catch(error => {
                    console.error('Error signing in anonymously:', error);
                });
        }
    };

    const colorOptions = ['#FFFFFF', '#FFD700', '#32CD32', '#87CEEB'];

    return (
        <ImageBackground source={image} style={styles.background}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
                <View style={styles.colorContainer}>
                    {colorOptions.map(color => (
                        <TouchableOpacity
                            key={color}
                            style={[styles.colorOption, { backgroundColor: color }]}
                            onPress={() => setSelectedColor(color)}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.enterButton} onPress={handleStartChat}>
                    <Text style={styles.enterButtonText}>Enter Chat</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        backgroundColor: 'white', // adding a background color to make input visible
    },
    colorContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    colorOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 10,
    },
    enterButton: {
        backgroundColor: '#007AFF', // Example button color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    enterButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Start;
