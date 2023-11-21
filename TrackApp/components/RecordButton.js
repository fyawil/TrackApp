import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function RecordButton({ navigation }) {
  const handleRecordPress = () => {
    // Navigate to RecordScreen
    navigation.navigate("Record");
  };

  return (
    <View style={styles.recordButtonView}>
      <Pressable style={styles.recordButton} onPress={handleRecordPress}>
        <Text style={styles.recordButtonText}>Record</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  recordButtonView: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  recordButton: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  recordButtonText: { 
    color: "black", 
    fontSize: 24 
  },
});
