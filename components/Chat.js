import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, query, addDoc, orderBy, onSnapshot } from 'firebase/firestore';

const Chat = ({ route, db, isConnected }) => {
  const { userId, name, selectedColor } = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = async newMessages => {
    const message = newMessages[0];
    try {
        console.log({
            text: message.text,
            createdAt: message.createdAt,
            userId: userId,
            userName: name,
          });
      const docRef = await addDoc(collection(db, 'messages'), {
        text: message.text,
        createdAt: message.createdAt,
        userId: userId,
        userName: name,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    if (isConnected) {
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
        // Cache messages whenever possible
        AsyncStorage.setItem('messages', JSON.stringify(messageList));
      });

      return () => {
        unsubscribe(); // Cleanup function to unsubscribe from snapshot listener
      };
    } else {
      // Load cached messages from local storage
      AsyncStorage.getItem('messages')
        .then((cachedMessages) => {
          if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
          }
        })
        .catch((error) => {
          console.error('Error loading cached messages: ', error);
        });
    }
  }, [db, isConnected]);

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
          renderInputToolbar={() => isConnected ? <InputToolbar /> : null}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;