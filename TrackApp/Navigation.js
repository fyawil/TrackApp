import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens here
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import RecordOrDisplayScreen from './screens/RecordOrDisplayScreen';
import RecordScreen from './screens/RecordScreen';
import RecordLiftScreen from './screens/RecordLiftScreen';
import RecordRunScreen from './screens/RecordRunScreen';
import DisplayScreen from './screens/DisplayScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="RecordOrDisplay" component={RecordOrDisplayScreen} />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="RecordLift" component={RecordLiftScreen} />
        <Stack.Screen name="RecordRun" component={RecordRunScreen} />
        <Stack.Screen name="Display" component={DisplayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
