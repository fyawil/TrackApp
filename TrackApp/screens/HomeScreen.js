import React from "react";
import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";

export default function HomeScreen({ navigation }) {
    const handleSignInPress = () => {
        navigation.navigate('SignIn'); // Navigate to the SignInScreen
      };

  return (
    <View style={styles.container}>
      <View style={styles.homePageTop}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>TRACK APP</Text>
        </View>
        <View style={styles.signInButtonView}>
          <Pressable style={styles.signInButton} onPress={handleSignInPress}>
            <Text style={{ color: "white" }}>Sign In</Text>
          </Pressable>
        </View>
        <View style={styles.signUpButtonView}>
          <Pressable style={styles.signUpButton}>
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.homePageBody}>
        <View style={styles.quoteView}>
          <Text style={styles.quote}>"What gets measured gets improved"</Text>          
        </View>
        <View style={styles.startButtonView}>
          <Pressable style={styles.startButton}>
            <Text style={{ color: "black", fontSize: 24 }}>START</Text>
          </Pressable>          
        </View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  homePageTop: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height: "10%",
  },
  logoView: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 24,
  },
  signInButtonView: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  signInButton: {
    backgroundColor: "black",
    height: "50%",
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButtonView: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButton: {
    backgroundColor: "black",
    height: "50%",
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  homePageBody: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    height: "90%",
    width: "100%",
  },
  quoteView: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },  
  quote: {
    color: "white",
    fontSize: 48,
    textAlign: "center",
  },
  startButtonView: {
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  }, 
  startButton: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});