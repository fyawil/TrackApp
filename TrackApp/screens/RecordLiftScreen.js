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

export default function RecordLiftScreen({ navigation }) {
  const db = SQLite.openDatabase("trackLog.db");
  const [isLoading, setIsLoading] = useState(true);

  const day = new Date().getDate();
  const [currentDay, setCurrentDay] = useState(`${day}`);
  const [currentDayPlaceholderColor, setCurrentDayPlaceholderColor] =
    useState("grey");

  const month = new Date().getMonth() + 1;
  const [currentMonth, setCurrentMonth] = useState(`${month}`);
  const [currentMonthPlaceholderColor, setCurrentMonthPlaceholderColor] =
    useState("grey");

  const year = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(`${year}`);
  const [currentYearPlaceholderColor, setCurrentYearPlaceholderColor] =
    useState("grey");

  const [currentExercise, setCurrentExercise] = useState("");
  const [currentExercisePlaceholderColor, setCurrentExercisePlaceholderColor] =
    useState("grey");

  const [currentWeight, setCurrentWeight] = useState("");
  const [currentWeightPlaceholderColor, setCurrentWeightPlaceholderColor] =
    useState("grey");

  const [currentReps, setCurrentReps] = useState("");
  const [currentRepsPlaceholderColor, setCurrentRepsPlaceholderColor] =
    useState("grey");

  const [showSuccessView, setShowSuccessView] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sets (id INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER, exercise TEXT, weight REAL, reps INTEGER)"
      );
    });

    setIsLoading(false);
  }, [db]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const isDayValid = () => {  
    if (currentDay.trim().length != 1 && currentDay.trim().length != 2) {
      return false
    }
    if (/[^0-9]/.test(currentDay.trim())) {
      return false;
    }
    if (+currentDay < 1) {
      return false;
    }
    if (+currentDay > 31) {
      return false;
    }
    return true;
  };

  const isMonthValid = () => {
    if (currentMonth.trim().length != 1 && currentMonth.trim().length != 2) {
      return false
    }    
    if (/[^0-9]/.test(currentMonth.trim())) {
      return false;
    }
    if (+currentMonth < 1) {
      return false;
    }
    if (+currentMonth > 12) {
      return false;
    }
    return true;
  };

  const isYearValid = () => {
    if (currentYear.trim().length != 4) {
      return false
    }    
    if (/[^0-9]/.test(currentYear.trim())) {
      return false;
    }
    return true;
  };

  const isExerciseValid = () => {
    if (/[^A-Za-z]/.test(currentExercise.trim())) {
      return false;
    }
    if (currentExercise.trim().length < 3 || currentExercise.trim().length > 50) {
      return false;
    }
    return true;
  };

  const isWeightValid = () => {
    if (!/^\d+(\.\d+)?$/.test(currentWeight.trim())) {
      return false;
    }
    return true;
  };

  const isRepsValid = () => {
    if (currentReps.trim() == "") {
      return false
    }
    if (/[^0-9]/.test(currentReps.trim())) {
      return false;
    }
    if (+currentReps < 0) {
      return false;
    }
    return true;
  };

  const isSetValid = () => {
    if (!isDayValid()) {
      setCurrentDay("");
      setCurrentDayPlaceholderColor("red");
    }
    else {
      setCurrentDayPlaceholderColor("grey");      
    }
    if (!isMonthValid()) {
      setCurrentMonth("");
      setCurrentMonthPlaceholderColor("red");
    }
    else {
      setCurrentMonthPlaceholderColor("grey");
    }
    if (!isYearValid()) {
      setCurrentYear("");
      setCurrentYearPlaceholderColor("red");
    }
    else {
      setCurrentYearPlaceholderColor("grey");
    }
    if (!isExerciseValid()) {
      setCurrentExercise("");
      setCurrentExercisePlaceholderColor("red");
    }
    else {
      setCurrentExercisePlaceholderColor("grey");
    }
    if (!isWeightValid()) {
      setCurrentWeight("");
      setCurrentWeightPlaceholderColor("red");
    }
    else {
      setCurrentWeightPlaceholderColor("grey");
    }
    if (!isRepsValid()) {
      setCurrentReps("");
      setCurrentRepsPlaceholderColor("red");
    }
    else {
      setCurrentRepsPlaceholderColor("grey");  
    }
    
    return (
      isDayValid() &&
      isMonthValid() &&
      isYearValid() &&
      isExerciseValid() &&
      isWeightValid() &&
      isRepsValid()
    );
  };

  const addSet = () => {
    if (isSetValid()) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO sets (day, month, year, exercise, weight, reps) VALUES (?, ?, ?, ?, ?, ?)",
            [
              currentDay,
              currentMonth,
              currentYear,
              currentExercise,
              currentWeight,
              currentReps,
            ],
            (_, { insertId }) => {
              // Data inserted successfully, you can clear the input fields here
              setCurrentDay("");
              setCurrentMonth("");
              setCurrentYear("");
              setCurrentExercise("");
              setCurrentWeight("");
              setCurrentReps("");
            },
            (_, error) => console.log(error)
          );
        },
        null,
        () => {
          // After successful insertion, log the data
          db.transaction(
            (tx) => {
              tx.executeSql("SELECT * FROM sets", [], (_, { rows }) => {
                const data = rows._array;
                console.log(data); // Log the data
              });
            },
            null,
            () => {}
          );
          displaySuccessMessage()
        }
      );
    } else {
      console.log("Invalid Set");
    }
  };

  const displaySuccessMessage = () => {
    setShowSuccessView(true);

    // Hide the view after 3 seconds
    setTimeout(() => {
      setShowSuccessView(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>

      <View style={styles.homePageTop}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>TRACK APP</Text>
        </View>
      </View>
      
        {showSuccessView && (
          <View style={styles.homePageBody}>
        <View style={styles.successView}>
          <Text style={styles.successText}>Set complete!</Text>
        </View>
        </View>
      )}
        {!showSuccessView && (<View style={styles.homePageBody}>
          <View style={styles.inputDateView}>
          <TextInput
            style={[styles.inputDay]}
            value={currentDay}
            placeholder="dd"
            placeholderTextColor={currentDayPlaceholderColor}
            onChangeText={setCurrentDay}
          />
          <TextInput
            style={styles.inputMonth}
            value={currentMonth}
            placeholder="mm"
            placeholderTextColor={currentMonthPlaceholderColor}
            onChangeText={setCurrentMonth}
          />
          <TextInput
            style={styles.inputYear}
            value={currentYear}
            placeholder="yyyy"
            placeholderTextColor={currentYearPlaceholderColor}
            onChangeText={setCurrentYear}
          />
        </View>
        <TextInput
          style={styles.inputExercise}
          value={currentExercise}
          placeholder="exercise"
          placeholderTextColor={currentExercisePlaceholderColor}
          onChangeText={setCurrentExercise}
        />
        <TextInput
          style={styles.inputWeight}
          value={currentWeight}
          placeholder="weight"
          placeholderTextColor={currentWeightPlaceholderColor}
          onChangeText={setCurrentWeight}
        />
        <TextInput
          style={styles.inputReps}
          value={currentReps}
          placeholder="reps"
          placeholderTextColor={currentRepsPlaceholderColor}
          onChangeText={setCurrentReps}
        />
        <Pressable style={styles.addSetButton} onPress={addSet}>
          <Text style={{ textAlign: "center", fontSize: 24 }}>+</Text>
        </Pressable>          
            </View>
        )}
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
  successView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  successText: {
    fontSize: 36,
    color: "white"
  },
  inputDateView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    width: "50%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputDay: {
    width: "32%",
    height: "100%",
    marginRight: "2%",
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "center",
  },
  inputMonth: {
    width: "32%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
  inputYear: {
    width: "32%",
    height: "100%",
    marginLeft: "2%",
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
  inputExercise: {
    width: "50%",
    height: "10%",
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
  inputWeight: {
    width: "50%",
    height: "10%",
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
  inputReps: {
    width: "50%",
    height: "10%",
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    textAlign: "center",
  },
  addSetButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
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
    textDecorationLine: "line-through"
  },
});