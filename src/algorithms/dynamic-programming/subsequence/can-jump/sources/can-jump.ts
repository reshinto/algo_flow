// Can Jump tabulation — determine if you can reach the last index from index 0
function canJump(nums: number[]): boolean {
  // @step:initialize
  const tableSize = nums.length; // @step:initialize
  const dpTable = new Array(tableSize).fill(0); // @step:initialize,fill-table
  dpTable[0] = 1; // @step:fill-table
  // For each index, check if any prior reachable index can reach it
  for (let targetIndex = 1; targetIndex < tableSize; targetIndex++) {
    // @step:compute-cell
    for (let sourceIndex = 0; sourceIndex < targetIndex; sourceIndex++) {
      // @step:read-cache
      if (dpTable[sourceIndex] === 1 && sourceIndex + nums[sourceIndex] >= targetIndex) {
        // @step:read-cache,compute-cell
        dpTable[targetIndex] = 1; // @step:compute-cell
        break;
      }
    }
  }
  return dpTable[tableSize - 1] === 1; // @step:complete
}
