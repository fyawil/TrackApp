import React from "react";
import { StyleSheet, View, Pressable, Text} from "react-native";

export default function PageFooter({ navigation, previousScreen= "none" }) {
  const handleBackPress = () => {
          // Navigate to previous screen
          navigation.navigate(previousScreen);
  };
    return (
        <View style={styles.homePageBottom}>
          {previousScreen !== "none" && <Pressable onPress={handleBackPress}>
                <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>}
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    homePageBottom: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "white",
      height: "10%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    backButtonText: {
      fontSize: 24,
    }
  });
  