// Radix Sort MSD — sort integers digit by digit from most to least significant (recursive)
function radixSortMsd(inputArray: number[]): number[] {
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
  const base = 10; // @step:initialize

  // Determine the highest digit position
  let maxDivisor = 1; // @step:initialize
  while (maxDivisor * base <= maxValue) {
    // @step:initialize
    maxDivisor *= base; // @step:initialize
  }

  // Recursive helper that sorts a sub-range by a given digit position
  function sortByDigit(subArray: number[], digitDivisor: number): number[] {
    // @step:extract-digit
    if (subArray.length <= 1 || digitDivisor < 1) return subArray; // @step:extract-digit

    const buckets: number[][] = Array.from({ length: base }, () => []); // @step:extract-digit

    for (const value of subArray) {
      // @step:extract-digit,compare
      const digit = Math.floor(value / digitDivisor) % base; // @step:extract-digit,compare
      buckets[digit]!.push(value); // @step:extract-digit
    }

    const result: number[] = []; // @step:place
    for (let bucketIndex = 0; bucketIndex < base; bucketIndex++) {
      // @step:place
      const sortedBucket = sortByDigit(buckets[bucketIndex]!, Math.floor(digitDivisor / base)); // @step:place
      for (const bucketValue of sortedBucket) {
        // @step:place
        result.push(bucketValue); // @step:place
      }
    }

    return result; // @step:place
  }

  const sorted = sortByDigit(workingArray, maxDivisor);

  // Restore offset
  for (let restoreIndex = 0; restoreIndex < arrayLength; restoreIndex++) {
    // @step:mark-sorted
    sorted[restoreIndex] = sorted[restoreIndex]! - offset; // @step:mark-sorted
  }

  return sorted; // @step:complete
}
