import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function DisplayButton({ navigation }) {
  const handleDisplayPress = () => {
    // Navigate to DisplayScreen
    navigation.navigate("Display");
  };

  return (
    <View style={styles.displayButtonView}>
    <Pressable style={styles.displayButton} onPress={handleDisplayPress}>
      <Text style={styles.displayButtonText}>Display</Text>
    </Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
  displayButtonView: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  displayButton: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  displayButtonText: { 
    color: "black", 
    fontSize: 24,
  },
});
