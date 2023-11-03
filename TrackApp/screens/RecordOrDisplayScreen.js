import React from "react";
import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";

export default function RecordScreen({ navigation }) {
  const handleRecord = () => {
    navigation.navigate("Record"); // Navigate to the Record Screen
  };

  const handleDisplay = () => {
    navigation.navigate("Display"); // Navigate to the DisplayScreen
  };

  return (
    <View style={styles.container}>
      <View style={styles.homePageTop}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>TRACK APP</Text>
        </View>
      </View>
      <View style={styles.homePageBody}>
        <View style={styles.recordButtonView}>
          <Pressable style={styles.recordButton} onPress={handleRecord}>
            <Text style={{ color: "black", fontSize: 24 }}>Record</Text>
          </Pressable>
        </View>
        <View style={styles.orView}>
          <Text style={{ color: "white", fontSize: 24 }}>Or</Text>          
        </View>
        <View style={styles.displayButtonView}>
          <Pressable style={styles.displayButton} onPress={handleDisplay}>
            <Text style={{ color: "black", fontSize: 24}}>Display</Text>
          </Pressable>
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
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
  },
  orView: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
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

