import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { collection, query, addDoc, orderBy, onSnapshot } from 'firebase/firestore';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, db, isConnected, storage }) => {
  const { userId, name, selectedColor } = route.params;
  const [messages, setMessages] = useState([]);

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#FC7A1E"
        },
        left: {
          backgroundColor: "#fff"
        }
      }}
    />
  }

  const onSend = async newMessages => {
    try {
      console.log(newMessages[0]);
      const docRef = addDoc(collection(db, "messages"), newMessages[0]);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      const unsubscribe = onSnapshot(query(collection(db, 'messages'), orderBy('createdAt', 'desc')), (snapshot) => {
        const messageList = [];
        snapshot.forEach(doc => {
          messageList.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
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

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 200,
            height: 200,
            margin: 6,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

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
          renderBubble={renderBubble}
          renderInputToolbar={(props) => isConnected ? <InputToolbar {...props} /> : null}
          renderActions={(props) => <CustomActions id={userId} storage={storage} onSend={onSend} {...props} />}
          renderCustomView={renderCustomView}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;