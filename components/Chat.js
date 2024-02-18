import React from 'react';
import { View, Text } from 'react-native';

const Chat = ({ route }) => {
    const { name } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to the chat, {name}!</Text>
        </View>
    );
};

export default Chat;