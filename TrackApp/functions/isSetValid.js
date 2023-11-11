import isExerciseValid from "./isExerciseValid"
import isWeightValid from "./isWeightValid"
import isRepsValid from "./isRepsValid"
  
  // Check if sets inputs are all valid and set placeholder font color of any invalid inputs to red
  const isSetValid = (exercise, weight, reps) => {
    if (!isExerciseValid(exercise)) {
      setCurrentExercise("");
      setCurrentExercisePlaceholderColor("red");
    } else {
      setCurrentExercisePlaceholderColor("grey");
    }
    if (!isWeightValid(weight)) {
      setCurrentWeight("");
      setCurrentWeightPlaceholderColor("red");
    } else {
      setCurrentWeightPlaceholderColor("grey");
    }
    if (!isRepsValid(reps)) {
      setCurrentReps("");
      setCurrentRepsPlaceholderColor("red");
    } else {
      setCurrentRepsPlaceholderColor("grey");
    }

    return (
      isExerciseValid(exercise) &&
      isWeightValid(weight) &&
      isRepsValid(reps)
    );
  };