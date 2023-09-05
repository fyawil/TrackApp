import React from 'react';
import { View, Text } from 'react-native';

export default function DisplayScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Display Screen</Text>
    </View>
  );
}