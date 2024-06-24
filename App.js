import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Episode from './screens/Episode';
import Page1 from './screens/Page1';
// import MainScreen from './screens/MainScreen';
import SignupPage from "./screens/Signup";
import Signin from "./screens/Signin";
import Homepage from "./screens/Homepage";
import Levels from "./screens/Levels";
import Help from './screens/Help';
import Setting from './screens/Setting';
import { Audio } from 'expo-av'; // Import Audio from expo-av

const Stack = createStackNavigator();

const App = () => {
  const [sound, setSound] = useState(); // State to store the sound object

  useEffect(() => {
    // Load the sound when the component mounts
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/Game_Sound.mp3') // Provide the correct path to your sound file
      );
      setSound(sound);
      sound.setIsLoopingAsync(true); // Set the sound to loop continuously
      sound.playAsync(); // Start playing the sound
    };

    loadSound(); // Call the function to load the sound

    return () => {
      // Unload the sound when the component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage" screenOptions={{ presentation: 'transparentModal' }}>
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false, gestureEnabled: false }} />
        {/* <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }} />
        <Stack.Screen name="SigninPage" component={Signin} options={{ headerShown: false }} />
        <Stack.Screen name="Ep1" component={Episode} options={{ headerShown: false }} />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
        <Stack.Screen name="Page1" component={Page1} options={{ headerShown: false }} />
        <Stack.Screen name="LevelsPage" component={Levels} options={{ headerShown: false }} />
        <Stack.Screen name="HelpPage" component={Help} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
