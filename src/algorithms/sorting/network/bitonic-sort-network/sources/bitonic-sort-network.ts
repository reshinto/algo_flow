// Bitonic Sort Network — fixed compare-swap network for power-of-2 sizes
function bitonicSortNetwork(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const originalLength = sortedArray.length; // @step:initialize

  // Pad to next power of 2 with large sentinel values
  let paddedLength = 1; // @step:initialize
  while (paddedLength < originalLength) {
    // @step:initialize
    paddedLength *= 2; // @step:initialize
  }
  while (sortedArray.length < paddedLength) {
    // @step:initialize
    sortedArray.push(Number.MAX_SAFE_INTEGER); // @step:initialize
  }

  // Bitonic sort network: log2(n) stages, each with sub-stages of compare-swap pairs
  for (let stageSize = 2; stageSize <= paddedLength; stageSize *= 2) {
    // @step:compare
    for (let subSize = stageSize; subSize >= 2; subSize = Math.floor(subSize / 2)) {
      // @step:compare
      const halfSubSize = subSize / 2; // @step:compare
      for (let elementIndex = 0; elementIndex < paddedLength; elementIndex++) {
        // @step:compare
        const partnerIndex = elementIndex ^ halfSubSize; // @step:compare
        if (partnerIndex > elementIndex) {
          // @step:compare
          const ascending = (elementIndex & stageSize) === 0; // @step:compare
          if (
            (ascending && sortedArray[elementIndex]! > sortedArray[partnerIndex]!) ||
            (!ascending && sortedArray[elementIndex]! < sortedArray[partnerIndex]!)
          ) {
            // @step:swap
            const temporaryValue = sortedArray[elementIndex]!; // @step:swap
            sortedArray[elementIndex] = sortedArray[partnerIndex]!; // @step:swap
            sortedArray[partnerIndex] = temporaryValue; // @step:swap
          }
        }
      }
    }
  }

  // Remove padding sentinels
  // @step:mark-sorted
  const result = sortedArray.slice(0, originalLength); // @step:mark-sorted

  return result; // @step:complete
}
