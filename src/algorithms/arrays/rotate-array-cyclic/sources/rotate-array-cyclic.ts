// Rotate Array (Cyclic Replacement) — O(n) time, O(1) space via cycle-following
function rotateArrayCyclic(inputArray: number[], rotateCount: number): number[] {
  const result = [...inputArray];
  const arrayLength = result.length;

  if (arrayLength === 0) {
    return result; // @step:initialize
  }

  const effectiveRotation = rotateCount % arrayLength; // @step:initialize

  if (effectiveRotation === 0) {
    return result; // @step:initialize
  }

  let cyclesCompleted = 0; // @step:initialize
  let startIndex = 0; // @step:initialize

  // Follow each cycle: place every element at its rotated destination
  while (cyclesCompleted < arrayLength) {
    let currentIndex = startIndex; // @step:visit
    let carryValue = result[currentIndex]!; // @step:visit

    // Traverse the cycle until returning to the start index
    do {
      const destinationIndex = (currentIndex + effectiveRotation) % arrayLength; // @step:compare
      const nextCarry = result[destinationIndex]!; // @step:compare
      result[destinationIndex] = carryValue; // @step:swap
      carryValue = nextCarry; // @step:swap
      cyclesCompleted++; // @step:swap
      currentIndex = destinationIndex; // @step:swap
    } while (currentIndex !== startIndex); // @step:compare

    startIndex++; // @step:visit
  }

  return result; // @step:complete
}
