import React from "react";
import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";

export default function HomeScreen({ navigation }) {
  const handleStartPress = () => {
    // Navigate to RecordOrDisplayScreen
    navigation.navigate("RecordOrDisplay");
  };

  return (
    <View style={styles.container}>
      {/* Page Header */}
      <View style={styles.homePageTop}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>TRACK APP</Text>
        </View>
      </View>
      {/* Page Body */}
      <View style={styles.homePageBody}>
        {/* Motivational Quote */}
        <View style={styles.quoteView}>
          <Text style={styles.quote}>"What gets measured gets improved"</Text>
        </View>
        {/* Start Button */}
        <View style={styles.startButtonView}>
          <Pressable style={styles.startButton} onPress={handleStartPress}>
            <Text style={{ color: "black", fontSize: 24 }}>START</Text>
          </Pressable>
        </View>
      </View>
      {/* Page Footer */}
      <View style={styles.homePageBottom}>
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
    homePageBottom: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "white",
      height: "10%",
    },
});
