// Spread Sort — hybrid distribution sort: distribute into bins by value, then insertion sort small bins
function spreadSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) {
    return sortedArray; // @step:complete
  }

  const minValue = Math.min(...sortedArray); // @step:initialize
  const maxValue = Math.max(...sortedArray); // @step:initialize

  if (minValue === maxValue) {
    return sortedArray; // @step:complete
  }

  // Number of bins — sqrt(n) is a common heuristic
  const binCount = Math.max(2, Math.ceil(Math.sqrt(arrayLength))); // @step:initialize
  const bins: number[][] = Array.from({ length: binCount }, () => []); // @step:initialize
  const valueRange = maxValue - minValue + 1; // @step:initialize

  // Distribute elements into bins based on value
  for (let distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) {
    // @step:distribute
    const normalizedOffset = sortedArray[distributeIndex]! - minValue; // @step:distribute
    const binIndex = Math.min(Math.floor((normalizedOffset / valueRange) * binCount), binCount - 1); // @step:distribute
    bins[binIndex]!.push(sortedArray[distributeIndex]!); // @step:distribute
  }

  // Process each bin — insertion sort for small bins, recurse for large
  let writeIndex = 0; // @step:compare
  for (let binIndex = 0; binIndex < binCount; binIndex++) {
    const bin = bins[binIndex]!; // @step:compare
    if (bin.length === 0) continue; // @step:compare

    // Insertion sort within the bin
    for (let outerIndex = 1; outerIndex < bin.length; outerIndex++) {
      // @step:compare
      const currentValue = bin[outerIndex]!; // @step:compare
      let insertPosition = outerIndex - 1; // @step:compare
      while (insertPosition >= 0 && bin[insertPosition]! > currentValue) {
        // @step:compare
        bin[insertPosition + 1] = bin[insertPosition]!; // @step:swap
        insertPosition--; // @step:swap
      }
      bin[insertPosition + 1] = currentValue; // @step:swap
    }

    // Write sorted bin back to the main array
    for (const binValue of bin) {
      sortedArray[writeIndex] = binValue; // @step:mark-sorted
      writeIndex++; // @step:mark-sorted
    }
  }

  return sortedArray; // @step:complete
}
