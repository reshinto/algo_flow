// Largest Rectangle in Histogram — O(n) monotonic stack approach
function largestRectangleHistogram(heights: number[]): {
  maxArea: number;
  leftIndex: number;
  rightIndex: number;
  height: number;
} {
  const arrayLength = heights.length;
  if (arrayLength === 0) {
    // @step:initialize
    return { maxArea: 0, leftIndex: -1, rightIndex: -1, height: 0 }; // @step:initialize
  }

  const indexStack: number[] = []; // @step:initialize
  let maxArea = 0; // @step:initialize
  let bestLeft = 0; // @step:initialize
  let bestRight = 0; // @step:initialize
  let bestHeight = 0; // @step:initialize

  for (let currentIndex = 0; currentIndex <= arrayLength; currentIndex++) {
    const currentHeight = currentIndex === arrayLength ? 0 : heights[currentIndex]!; // @step:compare

    while (indexStack.length > 0 && currentHeight < heights[indexStack[indexStack.length - 1]!]!) {
      // @step:compare
      const poppedIndex = indexStack.pop()!; // @step:visit
      const poppedHeight = heights[poppedIndex]!; // @step:visit
      const leftBoundary = indexStack.length === 0 ? 0 : indexStack[indexStack.length - 1]! + 1; // @step:visit
      const width = currentIndex - leftBoundary; // @step:visit
      const area = poppedHeight * width; // @step:visit

      if (area > maxArea) {
        // @step:compare
        maxArea = area; // @step:visit
        bestLeft = leftBoundary; // @step:visit
        bestRight = currentIndex - 1; // @step:visit
        bestHeight = poppedHeight; // @step:visit
      }
    }

    indexStack.push(currentIndex); // @step:visit
  }

  return { maxArea, leftIndex: bestLeft, rightIndex: bestRight, height: bestHeight }; // @step:complete
}
