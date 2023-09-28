import React from "react";
import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";

export default function RecordScreen({ navigation }) {
  const handleRecordLift = () => {
    navigation.navigate("SignIn"); // Navigate to the RecordLiftScreen
  };

  return (
    <View style={styles.container}>
      <View style={styles.homePageTop}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>TRACK APP</Text>
        </View>
      </View>
      <View style={styles.homePageBody}>
        <View style={styles.topQuoteView}>
          <Text style={styles.topQuote}>Ingrain Grit</Text>
        </View>
        <View style={styles.recordLiftButtonView}>
          <Pressable style={styles.recordLiftButton} onPress={handleRecordLift}>
            <Text style={{ color: "black", fontSize: 24 }}>Record Lift</Text>
          </Pressable>
        </View>
        <View style={styles.orView}>
          <Text style={{ color: "white", fontSize: 24 }}>Or</Text>          
        </View>
        <View style={styles.recordRunButtonView}>
          <Pressable style={styles.recordRunButton}>
            <Text style={{ color: "black", fontSize: 24, textDecorationLine: "line-through", }}>Record Run</Text>
          </Pressable>
        </View>
        <View style={styles.bottomQuoteView}>
          <Text style={styles.bottomQuote}>Master The Mechanics</Text>
        </View>
      </View>
      <View style={styles.homePageBottom}>
        <View style={styles.contactUsView}>
          <Text style={styles.contact}>Contact Us</Text>
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 24,
  },
  homePageBody: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    height: "80%",
    width: "100%",
  },
  topQuoteView: {
    height: "20%",
    width: "100%",
    alignItems: "right",
    justifyContent: "center",
  },
  topQuote: {
    color: "white",
    fontSize: 24,
    textAlign: "right",
  },
  recordLiftButtonView: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  recordLiftButton: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  orView: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  recordRunButtonView: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  recordRunButton: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomQuoteView: {
    height: "20%",
    width: "100%",
    alignItems: "left",
    justifyContent: "center",
  },
  bottomQuote: {
    color: "white",
    fontSize: 24,
    textAlign: "left",
  },
  homePageBottom: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height: "10%",
  },
  contactUsView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  contact: {
    fontSize: 24,
    textDecorationLine: "line-through",
  },
});

