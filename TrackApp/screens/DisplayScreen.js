import {
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

export default function DisplayScreen({ navigation }) {
  const db = SQLite.openDatabase("trackLog.db");

  const [exercises, setExercises] = useState([]);
  const [isExercisesShowing, setIsExercisesShowing] = useState(false);

  const [selectedExercise, setSelectedExercise] = useState("Pick An Exercise");
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [isChartShowing, setIsChartShowing] = useState(false);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT DISTINCT exercise FROM sets", [], (_, { rows }) => {
        // Extract the rows and store them in the exercises array
        const exercisesData = [];
        for (let i = 0; i < rows.length; i++) {
          exercisesData.push(rows.item(i).exercise);
        }

        setExercises(exercisesData.sort());
      });
    });
  }, [db]);

  const handleSetSelectedExercise = (ex) => {
    setSelectedExercise(ex);
    setIsExercisesShowing(false);
  };

  const displayStats = () => {
    if(selectedExercise != "Pick An Exercise"){
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT date, MAX(weight) AS max_weight FROM sets WHERE exercise = ? GROUP BY date",
        [selectedExercise],
        (_, { rows }) => {
          const chartLabels = [];
          const chartData = [];

          for (let i = 0; i < rows.length; i++) {
            chartLabels.push(rows.item(i).date);
            chartData.push(rows.item(i).max_weight);
          }

          setChartLabels(chartLabels);
          setChartData(chartData);
          setIsChartShowing(true);
        }
      );
    });      
    }
  };

  const handleBackToStatsSelection = () => {
    setIsChartShowing(false);
  };

  return (
    <View style={styles.container}>
      {/* Page Header */}
      <PageHeader navigation={navigation} />
      {!isChartShowing && (
        <View style={styles.homePageBody}>
          {!isExercisesShowing && (
            <View style={styles.inputExerciseView}>
              <Pressable
                value={true}
                style={styles.inputExerciseButton}
                onPress={setIsExercisesShowing}
              >
                <Text
                  style={styles.inputExerciseText}
                >{`${selectedExercise}`}</Text>
              </Pressable>
            </View>
          )}
          {isExercisesShowing && (
            <ScrollView
              style={styles.selectExerciseScrollView}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.selectExerciseScrollViewContent}
            >
              {exercises.map((ex) => (
                <Pressable
                  key={ex}
                  onPress={() => handleSetSelectedExercise(ex)}
                >
                  <Text style={styles.selectExerciseText}>{ex}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
          <View style={styles.displayStatsView}>
            <Pressable style={styles.displayStatsButton} onPress={displayStats}>
              <Text style={styles.displayStatsText}>Show Max Lifts</Text>
            </Pressable>
          </View>
        </View>
      )}
      {isChartShowing && (
        <View style={styles.homePageBody}>
          <View style={styles.chartView}>
            <Text style={{ color: "white" }}>Max Lifts Over Time</Text>
            <LineChart
              data={{
                labels: chartLabels,
                datasets: [
                  {
                    data: chartData,
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisSuffix="kg"
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffffff",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      )}
      {!isChartShowing && (
        <PageFooter navigation={navigation} previousScreen="Home" />
      )}
      {isChartShowing && (
        <View style={styles.homePageBottom}>
          <Pressable onPress={handleBackToStatsSelection}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      )}
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
  inputExerciseView: {
    height: "10%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputExerciseButton: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  inputExerciseText: {
    fontSize: 20,
  },
  selectExerciseScrollView: {
    maxHeight: "20%",
    width: "50%",
    backgroundColor: "white",
  },
  selectExerciseScrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  selectExerciseText: {
    fontSize: 20,
    textAlign: "center",
  },
  displayStatsView: {
    height: "10%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  displayStatsButton: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  displayStatsText: {
    fontSize: 20,
  },
  chartView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  chartText: {
    fontSize: 36,
    color: "white",
  },
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
  },
});
