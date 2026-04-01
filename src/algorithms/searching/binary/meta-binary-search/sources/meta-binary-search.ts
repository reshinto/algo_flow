// Meta Binary Search (One-Sided Binary Search) — uses bit manipulation to build position
function metaBinarySearch(sortedArray: number[], targetValue: number): number {
  // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  if (arrayLength === 0) return -1; // @step:initialize

  const bitCount = Math.floor(Math.log2(arrayLength)); // @step:initialize
  let position = 0; // @step:initialize

  for (let bitIndex = bitCount; bitIndex >= 0; bitIndex--) {
    // @step:compare
    const newPosition = position | (1 << bitIndex); // @step:compare

    if (newPosition < arrayLength && sortedArray[newPosition]! <= targetValue) {
      // @step:compare,eliminate
      position = newPosition; // @step:eliminate
    }
  }

  if (sortedArray[position] === targetValue) {
    // @step:compare,found
    return position; // @step:found
  }

  return -1; // @step:complete
}
