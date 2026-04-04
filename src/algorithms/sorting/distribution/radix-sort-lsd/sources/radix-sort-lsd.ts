// Radix Sort LSD — sort integers digit by digit from least to most significant
function radixSortLsd(inputArray: number[]): number[] {
  // @step:initialize
  if (inputArray.length === 0) return []; // @step:initialize
  const workingArray = [...inputArray]; // @step:initialize
  const arrayLength = workingArray.length; // @step:initialize

  // Offset negatives so all values are non-negative
  const minValue = Math.min(...workingArray); // @step:initialize
  const offset = minValue < 0 ? -minValue : 0; // @step:initialize
  for (let offsetIndex = 0; offsetIndex < arrayLength; offsetIndex++) {
    // @step:initialize
    workingArray[offsetIndex] = workingArray[offsetIndex]! + offset; // @step:initialize
  }

  const maxValue = Math.max(...workingArray); // @step:initialize

  // Process each digit position from least significant to most significant
  let digitDivisor = 1; // @step:initialize
  while (Math.floor(maxValue / digitDivisor) > 0) {
    // @step:extract-digit
    const base = 10; // @step:extract-digit
    const buckets: number[][] = Array.from({ length: base }, () => []); // @step:extract-digit

    // Distribute elements into buckets based on current digit
    for (let distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) {
      // @step:extract-digit,compare
      const digit = Math.floor(workingArray[distributeIndex]! / digitDivisor) % base; // @step:extract-digit,compare
      buckets[digit]!.push(workingArray[distributeIndex]!); // @step:extract-digit
    }

    // Collect elements back from buckets in order
    let writeIndex = 0; // @step:place
    for (let bucketIndex = 0; bucketIndex < base; bucketIndex++) {
      // @step:place
      for (const bucketValue of buckets[bucketIndex]!) {
        // @step:place
        workingArray[writeIndex] = bucketValue; // @step:place
        writeIndex++; // @step:place
      }
    }

    digitDivisor *= base; // @step:place
  }

  // Reverse the offset to restore original value range
  for (let restoreIndex = 0; restoreIndex < arrayLength; restoreIndex++) {
    // @step:mark-sorted
    workingArray[restoreIndex] = workingArray[restoreIndex]! - offset; // @step:mark-sorted
  }

  return workingArray; // @step:complete
}
