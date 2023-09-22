import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecordLiftScreen({ navigation }) {
  const [exercise, setExerciseText] = useState('');
  const [day, setDayText] = useState('');
  const [month, setMonthText] = useState('');
  const [year, setYearText] = useState('');
  const [weight, setWeightText] = useState('');
  const [reps, setRepsText] = useState('');
  const [records, setRecords] = useState([]);
  const [showRecords, setShowRecords] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const savedRecords = await AsyncStorage.getItem('liftRecords');
      if (savedRecords !== null) {
        setRecords(JSON.parse(savedRecords));
      }
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  const saveRecords = async () => {
    try {
      await AsyncStorage.setItem('liftRecords', JSON.stringify(records));
    } catch (error) {
      console.error('Error saving records:', error);
    }
  };

  const handleAddRecord = () => {
    const newRecord = {
      exercise,
      date: `${day}/${month}/${year}`,
      weight,
      reps,
    };

    setRecords([...records, newRecord]);

    setExerciseText('');
    setDayText('');
    setMonthText('');
    setYearText('');
    setWeightText('');
    setRepsText('');

    saveRecords();
  };

  const renderRecords = () => {
    if (showRecords) {
      return (
        <View>
          {records.map((record, index) => (
            <View key={index}>
              <Text style={styles.whiteText}>Exercise: {record.exercise}</Text>
              <Text style={styles.whiteText}>Date: {record.date}</Text>
              <Text style={styles.whiteText}>Weight: {record.weight}</Text>
              <Text style={styles.whiteText}>Reps: {record.reps}</Text>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

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
        <Pressable style={styles.addSetButton} onPress={handleAddRecord}>
          <Text style={{ textAlign: "center", fontSize: 24 }}>+</Text>
        </Pressable>
        <Pressable style={styles.showRecordsButton} onPress={() => setShowRecords(!showRecords)}>
          <Text style={{ textAlign: "center", fontSize: 24 }}>Show Records</Text>
        </Pressable>
        {renderRecords()}
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
  showRecordsButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
  },
  whiteText: {
    color: 'white',
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
