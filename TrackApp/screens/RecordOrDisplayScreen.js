import React from "react";
import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import PageHeader from "../components/PageHeader"

export default function RecordScreen({ navigation }) {
  const handleRecordPress = () => {
    // Navigate to RecordScreen
    navigation.navigate("Record"); 
  };

  const handleDisplayPress = () => {
    // Navigate to DisplayScreen
    navigation.navigate("Display"); 
  };

  return (
    <View style={styles.container}>
      {/* Page Header */}
      <PageHeader navigation={navigation}/>
      {/* Page Body */}
      <View style={styles.homePageBody}>
        {/* Record Button */}
        <View style={styles.recordButtonView}>
          <Pressable style={styles.recordButton} onPress={handleRecordPress}>
            <Text style={{ color: "black", fontSize: 24 }}>Record</Text>
          </Pressable>
        </View>
        {/* Or Text */}
        <View style={styles.orView}>
          <Text style={{ color: "white", fontSize: 24 }}>Or</Text>          
        </View>
        {/* Display Button */}
        <View style={styles.displayButtonView}>
          <Pressable style={styles.displayButton} onPress={handleDisplayPress}>
            <Text style={{ color: "black", fontSize: 24}}>Display</Text>
          </Pressable>
        </View>
      </View>
      {/* Page Footer */}
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

