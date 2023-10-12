import {
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  View,
  TextInput,
  Button,
  Platform,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";

export default function DisplayScreen({ navigation }) {
  const db = SQLite.openDatabase("trackLog.db");

  const [currentStartDay, setCurrentStartDay] = useState("");
  const [currentStartDayPlaceholderColor, setCurrentStartDayPlaceholderColor] =
    useState("grey");

  const [currentStartMonth, setCurrentStartMonth] = useState("");
  const [currentStartMonthPlaceholderColor, setCurrentStartMonthPlaceholderColor] =
    useState("grey");

  const [currentStartYear, setCurrentStartYear] = useState("");
  const [currentStartYearPlaceholderColor, setCurrentStartYearPlaceholderColor] =
    useState("grey");

  const [currentEndDay, setCurrentEndDay] = useState("");
  const [currentEndDayPlaceholderColor, setCurrentEndDayPlaceholderColor] =
    useState("grey");

  const [currentEndMonth, setCurrentEndMonth] = useState("");
  const [currentEndMonthPlaceholderColor, setCurrentEndMonthPlaceholderColor] =
    useState("grey");

  const [currentEndYear, setCurrentEndYear] = useState("");
  const [currentEndYearPlaceholderColor, setCurrentEndYearPlaceholderColor] =
    useState("grey");

    const isStartDayValid = () => {  
      if (currentStartDay.trim().length != 1 && currentStartDay.trim().length != 2) {
        return false
      }
      if (/[^0-9]/.test(currentStartDay.trim())) {
        return false;
      }
      if (+currentStartDay < 1) {
        return false;
      }
      if (+currentStartDay > 31) {
        return false;
      }
      return true;
    };
  
    const isStartMonthValid = () => {
      if (currentStartMonth.trim().length != 1 && currentStartMonth.trim().length != 2) {
        return false
      }    
      if (/[^0-9]/.test(currentStartMonth.trim())) {
        return false;
      }
      if (+currentStartMonth < 1) {
        return false;
      }
      if (+currentStartMonth > 12) {
        return false;
      }
      return true;
    };
  
    const isStartYearValid = () => {
      if (currentStartYear.trim().length != 4) {
        return false
      }    
      if (/[^0-9]/.test(currentStartYear.trim())) {
        return false;
      }
      return true;
    };

    const isEndDayValid = () => {  
      if (currentEndDay.trim().length != 1 && currentEndDay.trim().length != 2) {
        return false
      }
      if (/[^0-9]/.test(currentEndDay.trim())) {
        return false;
      }
      if (+currentEndDay < 1) {
        return false;
      }
      if (+currentEndDay > 31) {
        return false;
      }
      return true;
    };
  
    const isEndMonthValid = () => {
      if (currentEndMonth.trim().length != 1 && currentEndMonth.trim().length != 2) {
        return false
      }    
      if (/[^0-9]/.test(currentEndMonth.trim())) {
        return false;
      }
      if (+currentEndMonth < 1) {
        return false;
      }
      if (+currentEndMonth > 12) {
        return false;
      }
      return true;
    };
  
    const isEndYearValid = () => {
      if (currentEndYear.trim().length != 4) {
        return false
      }    
      if (/[^0-9]/.test(currentEndYear.trim())) {
        return false;
      }
      return true;
    };

  return (
    <View style={styles.container}>

      <View style={styles.homePageTop}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>TRACK APP</Text>
        </View>
      </View>
        <View style={styles.homePageBody}>  
        <View style={styles.inputStartDateView}>
          <TextInput
            style={[styles.inputStartDay]}
            value={currentStartDay}
            placeholder="dd"
            placeholderTextColor={currentStartDayPlaceholderColor}
            onChangeText={setCurrentStartDay}
          />
          <TextInput
            style={styles.inputStartMonth}
            value={currentStartMonth}
            placeholder="mm"
            placeholderTextColor={currentStartMonthPlaceholderColor}
            onChangeText={setCurrentStartMonth}
          />
          <TextInput
            style={styles.inputStartYear}
            value={currentStartYear}
            placeholder="yyyy"
            placeholderTextColor={currentStartYearPlaceholderColor}
            onChangeText={setCurrentStartYear}
          />
        </View>   
        <View style={styles.inputEndDateView}>
          <TextInput
            style={[styles.inputEndDay]}
            value={currentEndDay}
            placeholder="dd"
            placeholderTextColor={currentEndDayPlaceholderColor}
            onChangeText={setCurrentEndDay}
          />
          <TextInput
            style={styles.inputEndMonth}
            value={currentEndMonth}
            placeholder="mm"
            placeholderTextColor={currentEndMonthPlaceholderColor}
            onChangeText={setCurrentEndMonth}
          />
          <TextInput
            style={styles.inputEndYear}
            value={currentEndYear}
            placeholder="yyyy"
            placeholderTextColor={currentEndYearPlaceholderColor}
            onChangeText={setCurrentEndYear}
          />
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    margin: 8,
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
  inputStartDateView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    width: "50%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputStartDay: {
    width: "32%",
    height: "100%",
    marginRight: "2%",
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "center",
  },
  inputStartMonth: {
    width: "32%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
  inputStartYear: {
    width: "32%",
    height: "100%",
    marginLeft: "2%",
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
  inputEndDateView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    width: "50%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputEndDay: {
    width: "32%",
    height: "100%",
    marginRight: "2%",
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "center",
  },
  inputEndMonth: {
    width: "32%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
  inputEndYear: {
    width: "32%",
    height: "100%",
    marginLeft: "2%",
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
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
    textDecorationLine: "line-through"
  },
});
