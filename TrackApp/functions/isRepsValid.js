  // Check if sets reps number input is valid
  const isRepsValid = (reps) => {
    if (reps.trim() == "") {
      return false;
    }
    if (/[^0-9]/.test(reps.trim())) {
      return false;
    }
    if (+reps < 0) {
      return false;
    }
    return true;
  };