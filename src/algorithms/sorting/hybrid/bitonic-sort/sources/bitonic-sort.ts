// Bitonic Sort — build a bitonic sequence then merge to sort; works best on power-of-2 sizes
function bitonicSort(inputArray: number[]): number[] {
  // @step:initialize
  const arrayLength = inputArray.length; // @step:initialize
  if (arrayLength <= 1) return [...inputArray]; // @step:initialize

  // Pad to the next power of 2 with Infinity so real elements always sort first
  let paddedLength = 1; // @step:initialize
  while (paddedLength < arrayLength) paddedLength <<= 1; // @step:initialize
  const sortedArray: number[] = [...inputArray]; // @step:initialize
  while (sortedArray.length < paddedLength) sortedArray.push(Infinity); // @step:initialize

  // Bitonic sort network: outer stage controls the sub-sequence size
  for (let stage = 2; stage <= paddedLength; stage <<= 1) {
    // Each stage doubles the size of sorted bitonic sequences
    for (let step = stage >> 1; step > 0; step >>= 1) {
      // @step:compare
      for (let elementIndex = 0; elementIndex < paddedLength; elementIndex++) {
        const partnerIndex = elementIndex ^ step; // @step:compare

        if (partnerIndex > elementIndex) {
          // @step:compare
          const isAscending = (elementIndex & stage) === 0; // @step:compare

          if (isAscending && sortedArray[elementIndex]! > sortedArray[partnerIndex]!) {
            // @step:swap
            const temporaryValue = sortedArray[elementIndex]!; // @step:swap
            sortedArray[elementIndex] = sortedArray[partnerIndex]!; // @step:swap
            sortedArray[partnerIndex] = temporaryValue; // @step:swap
          } else if (!isAscending && sortedArray[elementIndex]! < sortedArray[partnerIndex]!) {
            // @step:swap
            const temporaryValue = sortedArray[elementIndex]!; // @step:swap
            sortedArray[elementIndex] = sortedArray[partnerIndex]!; // @step:swap
            sortedArray[partnerIndex] = temporaryValue; // @step:swap
          }
        }
      }
    }
  }

  // @step:mark-sorted
  return sortedArray.slice(0, arrayLength); // @step:complete
}
