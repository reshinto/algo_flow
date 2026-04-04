// Stalin Sort — eliminate any element smaller than the current maximum; returns only surviving elements
function stalinSort(inputArray: number[]): number[] {
  // @step:initialize
  const originalArray = [...inputArray]; // @step:initialize
  const arrayLength = originalArray.length; // @step:initialize

  if (arrayLength === 0) {
    return []; // @step:complete
  }

  const survivingElements: number[] = [originalArray[0]!]; // @step:initialize — first element always survives
  let currentMaximum = originalArray[0]!; // @step:initialize

  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    const candidateValue = originalArray[scanIndex]!;

    // @step:compare
    if (candidateValue >= currentMaximum) {
      // Element is in order — keep it
      currentMaximum = candidateValue; // @step:compare
      survivingElements.push(candidateValue); // @step:compare — keep
    }
    // Otherwise the element is eliminated (out of order)
    // @step:compare — eliminate
  }

  return survivingElements; // @step:complete
}
