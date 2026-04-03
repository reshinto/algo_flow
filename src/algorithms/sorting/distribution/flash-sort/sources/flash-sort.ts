// Flash Sort — classify elements into buckets by value range, permute in-place, then insertion sort
function flashSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) {
    return sortedArray; // @step:complete
  }

  // Find min and max to determine the value range
  let minValue = sortedArray[0]!; // @step:initialize
  let maxIndex = 0; // @step:initialize
  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    if (sortedArray[scanIndex]! < minValue) {
      minValue = sortedArray[scanIndex]!; // @step:initialize
    }
    if (sortedArray[scanIndex]! > sortedArray[maxIndex]!) {
      maxIndex = scanIndex; // @step:initialize
    }
  }

  if (sortedArray[maxIndex]! === minValue) {
    return sortedArray; // @step:complete
  }

  // Number of classes — roughly n/5 or 1, bounded
  const classCount = Math.max(1, Math.floor(0.45 * arrayLength)); // @step:initialize
  const classVector = new Array<number>(classCount).fill(0); // @step:initialize
  const scaleFactor = (classCount - 1) / (sortedArray[maxIndex]! - minValue); // @step:initialize

  // Classify — count how many elements fall in each class
  for (let classifyIndex = 0; classifyIndex < arrayLength; classifyIndex++) {
    // @step:classify
    const classIndex = Math.floor(scaleFactor * (sortedArray[classifyIndex]! - minValue)); // @step:classify
    classVector[classIndex]!++; // @step:classify
  }

  // Compute prefix sums (class upper boundaries)
  for (let prefixIndex = 1; prefixIndex < classCount; prefixIndex++) {
    // @step:classify
    classVector[prefixIndex]! += classVector[prefixIndex - 1]!; // @step:classify
  }

  // Swap the maximum element to the front temporarily
  const temporaryMax = sortedArray[0]!; // @step:swap
  sortedArray[0] = sortedArray[maxIndex]!; // @step:swap
  sortedArray[maxIndex] = temporaryMax; // @step:swap

  // Permutation phase — cycle sort within classes
  let cycleIndex = 0; // @step:swap
  let permutationsDone = 0; // @step:swap

  while (permutationsDone < arrayLength - 1) {
    // @step:swap
    while (
      cycleIndex >= classVector[Math.floor(scaleFactor * (sortedArray[cycleIndex]! - minValue))]!
    ) {
      // @step:compare
      cycleIndex++; // @step:compare
    }
    let holdValue = sortedArray[cycleIndex]!; // @step:swap
    let targetClass = Math.floor(scaleFactor * (holdValue - minValue)); // @step:swap

    while (cycleIndex !== classVector[targetClass]! - 1) {
      // @step:swap
      targetClass = Math.floor(scaleFactor * (holdValue - minValue)); // @step:swap
      const targetPosition = classVector[targetClass]! - 1; // @step:swap
      const flashTemp = sortedArray[targetPosition]!; // @step:swap
      sortedArray[targetPosition] = holdValue; // @step:swap
      holdValue = flashTemp; // @step:swap
      classVector[targetClass]!--; // @step:swap
      permutationsDone++; // @step:swap
    }
    // Place the final held value at cycleIndex to complete this cycle
    sortedArray[cycleIndex] = holdValue; // @step:swap
    permutationsDone++; // @step:swap
  }

  // Insertion sort pass to clean up small disorder within classes
  for (let outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
    // @step:insertion-pass
    const currentValue = sortedArray[outerIndex]!; // @step:insertion-pass
    let insertPosition = outerIndex - 1; // @step:insertion-pass

    while (insertPosition >= 0 && sortedArray[insertPosition]! > currentValue) {
      // @step:compare
      sortedArray[insertPosition + 1] = sortedArray[insertPosition]!; // @step:swap
      insertPosition--; // @step:swap
    }
    sortedArray[insertPosition + 1] = currentValue; // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
