// Find All Duplicates — O(n) time, O(1) space via sign-negation index marking
function findAllDuplicates(inputArray: number[]): number[] {
  const result = [...inputArray]; // @step:initialize
  const duplicates: number[] = []; // @step:initialize

  // Mark visited positions by negating the value at the mapped index
  for (let scanIndex = 0; scanIndex < result.length; scanIndex++) {
    const mappedIndex = Math.abs(result[scanIndex]!) - 1; // @step:compare

    if (result[mappedIndex]! < 0) {
      // Already negative means we visited this index before — duplicate found
      duplicates.push(Math.abs(result[scanIndex]!)); // @step:compare
    } else {
      result[mappedIndex] = -result[mappedIndex]!; // @step:swap
    }
  }

  return duplicates; // @step:complete
}
