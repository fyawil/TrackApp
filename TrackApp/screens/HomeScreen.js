import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import RecordButton from "../components/RecordButton";
import DisplayButton from "../components/DisplayButton";

export default function RecordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <PageHeader navigation={navigation} />
      <View style={styles.homePageBody}>
        <RecordButton navigation={navigation} />
        <Text style={styles.orText}>Or</Text>
        <DisplayButton navigation={navigation} />
      </View>
      <PageFooter navigation={navigation} />
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
  homePageBody: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  orText: {
    height: "20%",
    width: "100%",
    textAlignVertical: "center",
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
});
