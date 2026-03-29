// Max Product Subarray — O(n) tracking both max and min products to handle negative flips
function maxProductSubarray(inputArray: number[]): {
  maxProduct: number;
  startIndex: number;
  endIndex: number;
} {
  const arrayLength = inputArray.length;

  if (arrayLength === 0) {
    // @step:initialize
    return { maxProduct: 0, startIndex: 0, endIndex: 0 }; // @step:initialize
  }

  let currentMax = inputArray[0]!; // @step:initialize
  let currentMin = inputArray[0]!; // @step:initialize
  let globalMax = inputArray[0]!; // @step:initialize
  let currentStart = 0;
  let bestStart = 0;
  let bestEnd = 0;

  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    const currentElement = inputArray[scanIndex]!; // @step:compare

    // When multiplying by a negative, max and min swap roles
    if (currentElement < 0) {
      // @step:compare
      const tempMax = currentMax; // @step:compare
      currentMax = currentMin; // @step:compare
      currentMin = tempMax; // @step:compare
    }

    // Extend or restart the subarray
    currentMax = Math.max(currentElement, currentMax * currentElement); // @step:compare
    currentMin = Math.min(currentElement, currentMin * currentElement); // @step:compare

    if (currentMax === currentElement) {
      // @step:compare
      currentStart = scanIndex; // @step:compare
    }

    if (currentMax > globalMax) {
      // @step:compare
      globalMax = currentMax; // @step:compare
      bestStart = currentStart; // @step:compare
      bestEnd = scanIndex; // @step:compare
    }
  }

  return { maxProduct: globalMax, startIndex: bestStart, endIndex: bestEnd }; // @step:complete
}
