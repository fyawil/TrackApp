import { StyleSheet, Text, StatusBar, Pressable, View, TextInput, Button, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

export default function RecordLiftScreen({ navigation }) {

    const db = SQLite.openDatabase('trackLog.db');
    const [isLoading, setIsLoading] = useState(true); 

    const [currentDay, setCurrentDay] = useState(undefined);
    const [currentMonth, setCurrentMonth] = useState(undefined);
    const [currentYear, setCurrentYear] = useState(undefined);

    const [currentExercise, setCurrentExercise] = useState(undefined);

    const [currentWeight, setCurrentWeight] = useState(undefined);

    const [currentReps, setCurrentReps] = useState(undefined);

    useEffect(() => {

      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS sets (id INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, month INTEGER, year INTEGER, exercise TEXT, weight INTEGER, reps INTEGER)')
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
  
    const addSet = () => {

      db.transaction(tx => {
        tx.executeSql(          'INSERT INTO sets (day, month, year, exercise, weight, reps) VALUES (?, ?, ?, ?, ?, ?)',
        [currentDay, currentMonth, currentYear, currentExercise, currentWeight, currentReps],
        (_, { insertId }) => {
          // Data inserted successfully, you can clear the input fields here
          setCurrentDay('');
          setCurrentMonth('');
          setCurrentYear('');
          setCurrentExercise('');
          setCurrentWeight('');
          setCurrentReps('');
        },
        (_, error) => console.log(error)
      );
    },
    null,
    () => {
      // After successful insertion, log the data
      db.transaction(
        (tx) => {
          tx.executeSql('SELECT * FROM sets', [], (_, { rows }) => {
            const data = rows._array;
            console.log(data); // Log the data
          });
        },
        null,
        () => {}
      );
    }
  );
};

    return (
      <View style={styles.container}>
        <View style={styles.homePageTop}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>TRACK APP</Text>
        </View>
      </View>
      <View style={styles.homePageBody}>
        <View style={styles.inputDateView}>
          <TextInput
            style={styles.inputDay}
            value={currentDay}
            placeholder="dd"
            placeholderTextColor="grey"
            onChangeText={setCurrentDay}
          />
          <TextInput
            style={styles.inputMonth}
            value={currentMonth}
            placeholder="mm"
            placeholderTextColor="grey"
            onChangeText={setCurrentMonth}
          />
          <TextInput
            style={styles.inputYear}
            value={currentYear}
            placeholder="yyyy"
            placeholderTextColor="grey"
            onChangeText={setCurrentYear}
          />
        </View>
        <TextInput
          style={styles.inputExercise}
          value={currentExercise}
          placeholder="lift"
          placeholderTextColor="grey"
          onChangeText={setCurrentExercise}
        />
        <TextInput
          style={styles.inputWeight}
          value={currentWeight}
          placeholder="weight"
          placeholderTextColor="grey"
          onChangeText={setCurrentWeight}
        />
        <TextInput
          style={styles.inputReps}
          value={currentReps}
          placeholder="reps"
          placeholderTextColor="grey"
          onChangeText={setCurrentReps}
        />
        <Pressable style={styles.addSetButton} onPress={addSet}>
          <Text style={{ textAlign: "center", fontSize: 24 }}>+</Text>
        </Pressable>
        {/* {showNames()} */}
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      margin: 8
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
    inputDateView: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "black",
        width: '50%',
        height: "10%",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    inputDay: {
      width: '30%',
      height: "100%",
      backgroundColor: 'white',
      borderRadius: 5,
      color: 'black',
      textAlign: "center",
    },
    inputMonth: {
      width: '30%',
      height: "100%",
      backgroundColor: 'white',
      borderRadius: 5,
      color: 'black',
      textAlign: "center",
    },
    inputYear: {
      width: '30%',
      height: "100%",
      backgroundColor: 'white',
      borderRadius: 5,
      color: 'black',
      textAlign: "center"
    },
    inputExercise: {
      width: '50%',
      height: "10%",
      backgroundColor: 'white',
      borderRadius: 5,
      color: 'black',
      textAlign: "center"
    },
    inputWeight: {
      width: '50%',
      height: "10%",
      backgroundColor: 'white',
      borderRadius: 5,
      color: 'black',
      textAlign: "center",
    },
    inputReps: {
      width: '50%',
      height: "10%",
      backgroundColor: 'white',
      borderRadius: 5,
      color: 'black',
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
    },
  });

