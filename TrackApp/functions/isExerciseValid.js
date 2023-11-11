  // Check if sets exercise name input is valid
  const isExerciseValid = (exercise) => {
    if (/[^A-Za-z]/.test(exercise.trim())) {
      return false;
    }
    if (
      exercise.trim().length < 3 ||
      exercise.trim().length > 50
    ) {
      return false;
    }
    return true;
  };