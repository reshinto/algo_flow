// Trapping Rain Water — O(n) two-pointer approach
function trappingRainWater(heights: number[]): { totalWater: number; waterPerIndex: number[] } {
  const arrayLength = heights.length;
  if (arrayLength === 0) {
    // @step:initialize
    return { totalWater: 0, waterPerIndex: [] }; // @step:initialize
  }

  let leftPointer = 0; // @step:initialize
  let rightPointer = arrayLength - 1; // @step:initialize
  let maxLeft = 0; // @step:initialize
  let maxRight = 0; // @step:initialize
  let totalWater = 0; // @step:initialize
  const waterPerIndex = new Array(arrayLength).fill(0) as number[]; // @step:initialize

  while (leftPointer < rightPointer) {
    if (heights[leftPointer]! <= heights[rightPointer]!) {
      // @step:compare
      if (heights[leftPointer]! >= maxLeft) {
        // @step:compare
        maxLeft = heights[leftPointer]!; // @step:visit
      } else {
        waterPerIndex[leftPointer] = maxLeft - heights[leftPointer]!; // @step:visit
        totalWater += waterPerIndex[leftPointer]!; // @step:visit
      }
      leftPointer++; // @step:visit
    } else {
      if (heights[rightPointer]! >= maxRight) {
        // @step:compare
        maxRight = heights[rightPointer]!; // @step:visit
      } else {
        waterPerIndex[rightPointer] = maxRight - heights[rightPointer]!; // @step:visit
        totalWater += waterPerIndex[rightPointer]!; // @step:visit
      }
      rightPointer--; // @step:visit
    }
  }

  return { totalWater, waterPerIndex }; // @step:complete
}
