import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Episode from './screens/Episode';
import Page1 from './screens/Page1';
import MainScreen from './screens/Mainscreen';
import SignupPage from "./screens/Signup";
import Signin from "./screens/Signin";
import Homepage from "./screens/Homepage";
import Levels from "./screens/Levels";
import Help from './screens/Help';
import Splash from './screens/Splash';
import Setting from './screens/Setting';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{presentation: 'transparentModal'}}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupPage"
          component={SignupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SigninPage"
          component={Signin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ep1"
          component={Episode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Page1"
          component={Page1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomePage"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LevelsPage"
          component={Levels}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelpPage"
          component={Help}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
