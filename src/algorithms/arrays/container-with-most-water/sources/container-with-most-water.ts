// Container With Most Water — two pointers converge inward, always moving the shorter bar to maximize area
function containerWithMostWater(heights: number[]): {
  maxArea: number;
  leftIndex: number;
  rightIndex: number;
} {
  let leftPointer = 0; // @step:initialize
  let rightPointer = heights.length - 1; // @step:initialize
  let maxArea = 0; // @step:initialize
  let bestLeft = 0; // @step:initialize
  let bestRight = heights.length - 1; // @step:initialize

  while (leftPointer < rightPointer) {
    const leftHeight = heights[leftPointer]!; // @step:visit
    const rightHeight = heights[rightPointer]!; // @step:visit
    const currentArea = Math.min(leftHeight, rightHeight) * (rightPointer - leftPointer); // @step:compare

    if (currentArea > maxArea) {
      // @step:compare
      maxArea = currentArea; // @step:compare
      bestLeft = leftPointer; // @step:compare
      bestRight = rightPointer; // @step:compare
    }

    if (leftHeight <= rightHeight) {
      // @step:compare
      leftPointer++; // @step:visit
    } else {
      rightPointer--; // @step:visit
    }
  }

  return { maxArea, leftIndex: bestLeft, rightIndex: bestRight }; // @step:complete
}
