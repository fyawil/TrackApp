import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function PageHeader({ navigation }) {
    const handleHeaderPress = () => {
      // Navigate to HomeScreen
      navigation.navigate("Home");
    };
  
    return (
        <View style={styles.homePageTop}>
          <View style={styles.logoView}>
            <Pressable onPress={handleHeaderPress}>
                <Text style={styles.logo}>TRACK APP</Text>
            </Pressable>
          </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
      homePageTop: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        height: "10%",
      },
        logoView: {
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
          logo: {
            fontSize: 24,
          },
  });
  