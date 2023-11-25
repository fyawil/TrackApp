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
  const [chartType, setChartType] = useState("");
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

  const displayMaxWeightPerDay = () => {
    if(selectedExercise != "Pick An Exercise"){
      setChartType("Max Weight Lifted Over Time");
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

  const displayVolumePerDay = () => {
    if(selectedExercise != "Pick An Exercise"){
      setChartType("Volume Over Time");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT date, SUM(weight * reps) AS volume_of_date FROM sets WHERE exercise = ? GROUP BY date",
        [selectedExercise],
        (_, { rows }) => {
          const chartLabels = [];
          const chartData = [];

          for (let i = 0; i < rows.length; i++) {
            chartLabels.push(rows.item(i).date);
            chartData.push(rows.item(i).volume_of_date);
          }

          setChartLabels(chartLabels);
          setChartData(chartData);
          setIsChartShowing(true);
        }
      );
    });      
    }
  };

    const displayMaxRepsPerDay = () => {
    if(selectedExercise != "Pick An Exercise"){
      setChartType("Max Reps in A Set Over Time");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT date, MAX(reps) AS max_reps FROM sets WHERE exercise = ? GROUP BY date",
        [selectedExercise],
        (_, { rows }) => {
          const chartLabels = [];
          const chartData = [];

          for (let i = 0; i < rows.length; i++) {
            chartLabels.push(rows.item(i).date);
            chartData.push(rows.item(i).max_reps);
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
            <View style={styles.inputExerciseBrick}>
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
            </View>
          )}
          {isExercisesShowing && (
            <View style={styles.inputExerciseBrick}>
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
            </View>
          )}
          <View style={styles.topTwoStats}>
          <View style={styles.displayStatsView}>
            <Pressable style={styles.displayStatsButton} onPress={displayMaxWeightPerDay}>
              <Text style={styles.displayStatsText}>Show Max Lifts</Text>
            </Pressable>
          </View>
          <View style={styles.displayStatsView}>
            <Pressable style={styles.displayStatsButton} onPress={displayVolumePerDay}>
              <Text style={styles.displayStatsText}>Show Volume</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottomTwoStats}>
          <View style={styles.displayStatsView}>
            <Pressable style={styles.displayStatsButton} onPress={displayMaxRepsPerDay}>
              <Text style={styles.displayStatsText}>Show Max Reps</Text>
            </Pressable>
          </View>
        </View>
        </View>
      )}
      {isChartShowing && (
        <View style={styles.homePageBody}>
          <View style={styles.chartView}>
            <Text style={{ color: "white" }}>{chartType}</Text>
            <LineChart
              data={{
                labels: chartLabels,
                datasets: [
                  {
                    data: chartData,
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.9} // from react-native
              height={Dimensions.get("window").height * 0.7}
              verticalLabelRotation={45}
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
              withShadow={false}
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
  inputExerciseBrick: {
    display: "flex",
    flexDirection: "column",
    height: "34%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputExerciseView: {
    height: "34%",
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
    maxHeight: "90%",
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
  topTwoStats: {
    display: "flex",
    flexDirection: "row",
    height: "33%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomTwoStats: {
    display: "flex",
    flexDirection: "row",
    height: "33%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  displayStatsView: {
    height: "90%",
    width: "45%",
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
