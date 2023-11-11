  // Check if sets added weight input is valid
  const isWeightValid = (weight) => {
    if (!/^\d+(\.\d+)?$/.test(weight.trim())) {
      return false;
    }
    return true;
  };