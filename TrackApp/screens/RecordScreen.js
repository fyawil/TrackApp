import {
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  View,
  TextInput
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader"

export default function RecordLiftScreen({ navigation }) {
  const db = SQLite.openDatabase("trackLog.db");
  const [isLoading, setIsLoading] = useState(true);

  date = new Date().toLocaleDateString()
  const [currentDate, setCurrentDate] = useState(`${date}`);

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
        "CREATE TABLE IF NOT EXISTS sets (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, exercise TEXT, weight REAL, reps INTEGER)"
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

  const isWeightValid = () => {
    if (!/^\d+(\.\d+)?$/.test(currentWeight.trim())) {
      return false;
    }
    return true;
  };

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

  const isSetValid = () => {
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
            "INSERT INTO sets (date, exercise, weight, reps) VALUES (?, ?, ?, ?)",
            [
              currentDate,
              currentExercise,
              currentWeight,
              currentReps,
            ],
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
          // After successful insertion, log the data
          db.transaction(
            (tx) => {
              tx.executeSql("SELECT * FROM sets", [], (_, { rows }) => {
                const data = rows._array;
                console.log(data); // Log the data /////////////////////////////////////////////////////
              });
            },
            null,
            () => {}
          );
          displaySuccessMessage();
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
      {/* Page Header */}
      <PageHeader navigation={navigation}/>
      {showSuccessView && (
        <View style={styles.homePageBody}>
          <View style={styles.successView}>
            <Text style={styles.successText}>Set complete!</Text>
          </View>
        </View>
      )}
      {!showSuccessView && (
        <View style={styles.homePageBody}>
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
    justifyContent: "center",
  },
  successText: {
    fontSize: 36,
    color: "white",
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
    textDecorationLine: "line-through",
  },
});
