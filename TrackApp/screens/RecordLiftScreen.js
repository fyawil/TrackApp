import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Pressable, TextInput } from 'react-native';

export default function RecordLiftScreen({ navigation }) {
  const [exercise, setExerciseText] = useState('');
  const [day, setDayText] = useState('');
  const [month, setMonthText] = useState('');
  const [year, setYearText] = useState('');
  const [weight, setWeightText] = useState('');
  const [reps, setRepsText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.homePageTop}>
        <View style={styles.logoView}>
          <Text style={styles.logo}>TRACK APP</Text>
        </View>
      </View>
      <View style={styles.homePageBody}>
        <View style={styles.date}>
          <TextInput
            style={styles.inputDay}
            onChangeText={setDayText}
            value={day}
            placeholder="dd"
            placeholderTextColor="grey"
          />
          <TextInput
            style={styles.inputMonth}
            onChangeText={setMonthText}
            value={month}
            placeholder="mm"
            placeholderTextColor="grey"
          />
          <TextInput
            style={styles.inputYear}
            onChangeText={setYearText}
            value={year}
            placeholder="yyyy"
            placeholderTextColor="grey"
          />
        </View>
        <TextInput
          style={styles.inputExercise}
          onChangeText={setExerciseText}
          value={exercise}
          placeholder="lift"
          placeholderTextColor="grey"
        />
        <TextInput
          style={styles.inputWeight}
          onChangeText={setWeightText}
          value={weight}
          placeholder="weight"
          placeholderTextColor="grey"
        />
        <TextInput
          style={styles.inputReps}
          onChangeText={setRepsText}
          value={reps}
          placeholder="reps"
          placeholderTextColor="grey"
        />
        <Pressable style={styles.addSetButton}>
          <Text style={{ textAlign: "center", fontSize: 24 }}>+</Text>
        </Pressable>
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
  homePageTop: {
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
  date: {
    display: "flex",
    flexDirection: "row",
    height: "10%",
    width: "50%",
    justifyContent: "space-between",
  },
  inputDay: {
    width: '30%', // Adjust the width as needed
    height: "100%", // Adjust the height as needed
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 5, // Add border radius for a rounded look
    color: 'black', // Set the text color
    textAlign: "center",
  },
  inputMonth: {
    width: '30%', // Adjust the width as needed
    height: "100%", // Adjust the height as needed
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 5, // Add border radius for a rounded look
    color: 'black', // Set the text color
    textAlign: "center",
  },
  inputYear: {
    width: '30%', // Adjust the width as needed
    height: "100%", // Adjust the height as needed
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 5, // Add border radius for a rounded look
    color: 'black', // Set the text color
    textAlign: "center"
  },
  inputExercise: {
    width: '50%', // Adjust the width as needed
    height: "10%", // Adjust the height as needed
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 5, // Add border radius for a rounded look
    color: 'black', // Set the text color
    textAlign: "center"
  },
  inputWeight: {
    width: '50%', // Adjust the width as needed
    height: "10%", // Adjust the height as needed
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 5, // Add border radius for a rounded look
    color: 'black', // Set the text color
    textAlign: "center",
  },
  inputReps: {
    width: '50%', // Adjust the width as needed
    height: "10%", // Adjust the height as needed
    backgroundColor: 'white', // Set the background color to white
    borderRadius: 5, // Add border radius for a rounded look
    color: 'black', // Set the text color
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