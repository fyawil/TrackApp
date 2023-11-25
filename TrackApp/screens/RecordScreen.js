import {
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  View,
  TextInput,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

export default function RecordLiftScreen({ navigation }) {
  const db = SQLite.openDatabase("trackLog.db");

  // Create sets exercise name variable (currentExercise) and make its input field placeholder font color grey and set currentDate to 
  // today's date in user's local format 
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  const [currentDate, setCurrentDate] = useState(`${dd}/${mm}/${yyyy}`);
  const [currentDatePlaceholderColor, setCurrentDatePlaceholderColor] =
  useState("grey");

  // Create sets exercise name variable (currentExercise) and make its input field placeholder font color grey
  const [currentExercise, setCurrentExercise] = useState("");
  const [currentExercisePlaceholderColor, setCurrentExercisePlaceholderColor] =
    useState("grey");
  // Create sets added weight variable (currentWeight) and make its input field placeholder font color grey
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentWeightPlaceholderColor, setCurrentWeightPlaceholderColor] =
    useState("grey");
  // Create sets rep number variable (currentReps) and make its input field placeholder font color grey
  const [currentReps, setCurrentReps] = useState("");
  const [currentRepsPlaceholderColor, setCurrentRepsPlaceholderColor] =
    useState("grey");

  // Initialise the confirmation message of set being completed as hidden, so success message is not shown initially
  const [showSuccessView, setShowSuccessView] = useState(false);

  // Create the database if it does not exist when screen loads
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sets (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, exercise TEXT, weight REAL, reps INTEGER)"
      );
    });
  }, [db]);

  // Check if sets exercise name input is valid
  const isDateValid = () => {
    const [day, month, year] = currentDate.split("/").map(Number);
    const parsedDate = new Date(year, month - 1, day); // Month is 0-based in JavaScript Dates
  
    if (isNaN(parsedDate.getTime())) {
      return false;
    }
    return true;
  };  

  // Check if sets exercise name input is valid
  const isExerciseValid = () => {
    if (/[^A-Za-z]/.test(currentExercise.trim())) {
      return false;
    }
    if (
      currentExercise.trim().length < 3 ||
      currentExercise.trim().length > 50
    ) {
      return false;
    }
    return true;
  };

    // Check if sets added weight input is valid
    const isWeightValid = () => {
      if (!/^\d+(\.\d+)?$/.test(currentWeight.trim())) {
        return false;
      }
      return true;
    };

      // Check if sets reps number input is valid
  const isRepsValid = () => {
    if (currentReps.trim() == "") {
      return false;
    }
    if (/[^0-9]/.test(currentReps.trim())) {
      return false;
    }
    if (+currentReps < 0) {
      return false;
    }
    return true;
  };
  
  // Check if sets inputs are all valid and set placeholder font color of any invalid inputs to red
  function isSetValid () {
    if (!isDateValid()) {
      setCurrentDate("");
      setCurrentDatePlaceholderColor("red");
    } else {
      setCurrentDatePlaceholderColor("grey");
    }
    if (!isExerciseValid()) {
      setCurrentExercise("");
      setCurrentExercisePlaceholderColor("red");
    } else {
      setCurrentExercisePlaceholderColor("grey");
    }
    if (!isWeightValid()) {
      setCurrentWeight("");
      setCurrentWeightPlaceholderColor("red");
    } else {
      setCurrentWeightPlaceholderColor("grey");
    }
    if (!isRepsValid()) {
      setCurrentReps("");
      setCurrentRepsPlaceholderColor("red");
    } else {
      setCurrentRepsPlaceholderColor("grey");
    }

    return (
      isDateValid() &&
      isExerciseValid() &&
      isWeightValid() &&
      isRepsValid()
    );
  };

  // Add set to db and reset all input field and display success message if all inputs are valid
  const addSet = () => {
    if (isSetValid()) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO sets (date, exercise, weight, reps) VALUES (?, ?, ?, ?)",
            [currentDate, currentExercise, currentWeight, currentReps],
            (_, { insertId }) => {
              // Data inserted successfully, you can clear the input fields here
              setCurrentExercise("");
              setCurrentWeight("");
              setCurrentReps("");
            },
            (_, error) => console.log(error)
          );
        },
        null,
        () => {
          // After successful insertion, display success message
          displaySuccessMessage();
        }
      );
    }
  };

  const displaySuccessMessage = () => {
    setShowSuccessView(true);

    setTimeout(() => {
      setShowSuccessView(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <PageHeader navigation={navigation} />
      {/* Workout Set Details Input Form */}
      {!showSuccessView && (
        <View style={styles.homePageBody}>
          {/* Workout Sets Date Input */}
          <TextInput
            style={styles.inputDate}
            value={currentDate}
            placeholder="dd/mm/yyyy"
            placeholderTextColor={currentDatePlaceholderColor}
            onChangeText={setCurrentDate}
          />
          {/* Workout Sets Exercise Name Input */}
          <TextInput
            style={styles.inputExercise}
            value={currentExercise}
            placeholder="exercise"
            placeholderTextColor={currentExercisePlaceholderColor}
            onChangeText={setCurrentExercise}
          />
          {/* Workout Sets Added Weight Input */}
          <TextInput
            style={styles.inputWeight}
            value={currentWeight}
            placeholder="weight"
            placeholderTextColor={currentWeightPlaceholderColor}
            onChangeText={setCurrentWeight}
          />
          {/* Workout Sets Rep Number Input */}
          <TextInput
            style={styles.inputReps}
            value={currentReps}
            placeholder="reps"
            placeholderTextColor={currentRepsPlaceholderColor}
            onChangeText={setCurrentReps}
          />
          {/* Button To Add Set To local DB */}
          <Pressable style={styles.addSetButton} onPress={addSet}>
            <Text style={{ textAlign: "center", fontSize: 24 }}>Add Set</Text>
          </Pressable>
        </View>
      )}
      {/* 3-Second Success Message Displayed After DB Insertion of Set */}
      {showSuccessView && (
        <View style={styles.homePageBody}>
          <View style={styles.successView}>
            <Text style={styles.successText}>Set complete!</Text>
          </View>
        </View>
      )}
      <PageFooter navigation={navigation} previousScreen="Home" />
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
    justifyContent: "center",
  },
  successText: {
    fontSize: 36,
    color: "white",
  },
  inputDate: {
    width: "50%",
    height: "10%",
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
});
