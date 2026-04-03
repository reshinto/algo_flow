// Odd-Even Merge Sort — Batcher's odd-even transposition sort (correct for all sizes)
function oddEvenMergeSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) {
    return sortedArray; // @step:complete
  }

  // Batcher's odd-even transposition sort:
  // Alternates between odd-phase and even-phase compare-swap passes
  // Requires ceil(n/2) * 2 rounds to sort n elements
  const totalRounds = Math.ceil(arrayLength / 2) * 2; // @step:merge

  for (let roundIndex = 0; roundIndex < totalRounds; roundIndex++) {
    // @step:compare
    const isOddRound = roundIndex % 2 === 0; // @step:compare
    const startIndex = isOddRound ? 0 : 1; // @step:compare

    for (let leftIndex = startIndex; leftIndex + 1 < arrayLength; leftIndex += 2) {
      // @step:compare
      if (sortedArray[leftIndex]! > sortedArray[leftIndex + 1]!) {
        // @step:swap
        const temporaryValue = sortedArray[leftIndex]!; // @step:swap
        sortedArray[leftIndex] = sortedArray[leftIndex + 1]!; // @step:swap
        sortedArray[leftIndex + 1] = temporaryValue; // @step:swap
      }
    }
  }

  // @step:mark-sorted

  return sortedArray; // @step:complete
}
