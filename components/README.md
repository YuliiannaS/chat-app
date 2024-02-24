# Chat 📱

## Description

This is a simple mobile app built in React Native that provides users with a chat interface to exchange text and media in real time.

## Features

- Sending and receiving text messages

- Sending and receiving images, or taking photos

- Sharing your location

- Access to chat history, even when offline

- Use of screen readers is enabled for the visually impaired

## Dependencies

- React Native -- Gifted Chat, Navigation, AsyncStorage, Stack Navigator, Maps

- Expo

- Google Firebase Database & Storage

## Usage

Please follow these steps to get Chat up and running:

1\. Clone the repository

2\. Install Node.js. To avoid any potential conflicts, it is recommended to run `nvm use 16.19.0` in the terminal

3\. Install Expo by running `npm install -g expo-cli`

4\. Update your firebase configuration in `App.js`

5\. Download the Expo Go app on your mobile and open

6\. In the terminal run `npm start` or `expo start` from the project directory

7\. Use `expo start --android` or `expo start --ios` to start on the device

The messages and images shared will need to be stored somewhere. For this purpose, Google's Firebase is the storage solution. Using a Google Account, sign in and set up a Firestore Database. Important pointers during setup:

- Create your Firestore Database in production mode

- Create your Storage in production mode

- Navigate to the "Rules" tab and edit `allow read, write: if false` to `allow read, write: if true` and click "Publish" to save the changes for both of them