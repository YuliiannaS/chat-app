import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} options={{ title: 'Start Screen' }} />
        <Stack.Screen name="Chat" component={Chat} options={({ route }) => ({ title: route.params.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
