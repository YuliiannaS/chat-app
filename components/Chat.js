import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route }) => {
    const { name, selectedColor } = route.params;
    const [messages, setMessages] = useState([]);

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
      }

    const renderBubble = (props) => {
        return <Bubble
        {...props}
        wrapperStyle={ {
          right: {
            backgroundColor: '#2a9d8f', 
          }, 
          left: {
            backgroundColor: '#fff'
          }
        }}
        />
      }

    useEffect(() => {
        setMessages(previousMessages => [
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: selectedColor }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <GiftedChat
                    messages={messages}
                    renderBubble={renderBubble}
                    onSend={messages => onSend(messages)}
                    user={{ _id: 1 }}
                />
            </KeyboardAvoidingView>
        </View>
    );
};

export default Chat;
