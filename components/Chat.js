import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, query, addDoc, orderBy, onSnapshot } from 'firebase/firestore';

const Chat = ({ route, db }) => {
  const { userId, name, selectedColor } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = async newMessages => {
    const message = newMessages[0];
    try {
        console.log({
            text: message.text,
            createdAt: message.createdAt,
            userId: userId,
          });
      const docRef = await addDoc(collection(db, 'messages'), {
        text: message.text,
        createdAt: message.createdAt,
        userId: userId,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'messages'), orderBy('createdAt', 'desc')), (snapshot) => {
      const messageList = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messageList.push({
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to JavaScript Date object
          user: {
            _id: data.userId,
            name: data.userName,
          },
        });
      });
      setMessages(messageList);
    });

    return () => {
      unsubscribe(); // Cleanup function to unsubscribe from snapshot listener
    };
  }, [db]);

  return (
    <View style={{ flex: 1, backgroundColor: selectedColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{ _id: userId, name: name }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;