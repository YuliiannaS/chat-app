import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBsbrqB9bcqX7_JmRizUJ3Z4n4BTyby_Ok",
    authDomain: "chat-app-9f90e.firebaseapp.com",
    projectId: "chat-app-9f90e",
    storageBucket: "chat-app-9f90e.appspot.com",
    messagingSenderId: "527333204506",
    appId: "1:527333204506:web:fa82a31aae2ec01773e7a3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const connectionStatus = useNetInfo();

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (!connectionStatus.isConnected) {
      disableNetwork(db);
      setIsConnected(false)
    } else {
      setIsConnected(true);
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} isConnected={isConnected} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
