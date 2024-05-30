import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Episode from './screens/Episode';
import Page1 from './screens/Page1';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Ep1"
          component={Episode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Page1"
          component={Page1}
          options={{headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
