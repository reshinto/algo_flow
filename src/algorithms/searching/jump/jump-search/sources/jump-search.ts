// Jump Search — jump forward by sqrt(n) blocks, then linear scan within the block
function jumpSearch(sortedArray: number[], targetValue: number): number {
  // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  if (arrayLength === 0) return -1; // @step:initialize

  const blockSize = Math.floor(Math.sqrt(arrayLength)); // @step:initialize
  let blockStart = 0; // @step:initialize
  let jumpEnd = blockSize; // @step:initialize

  while (jumpEnd < arrayLength && sortedArray[jumpEnd - 1]! < targetValue) {
    // @step:visit
    blockStart = jumpEnd; // @step:visit
    jumpEnd += blockSize; // @step:visit
  }

  // Linear scan within the identified block
  const scanEnd = Math.min(jumpEnd, arrayLength); // @step:compare
  for (let currentIndex = blockStart; currentIndex < scanEnd; currentIndex++) {
    // @step:compare
    if (sortedArray[currentIndex]! === targetValue) {
      // @step:compare,found
      return currentIndex; // @step:found
    }
  }

  return -1; // @step:complete
}
