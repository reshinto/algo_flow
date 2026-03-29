// Climbing stairs tabulation — count ways to reach the top
function climbingStairsTabulation(numberOfStairs: number): number {
  // @step:initialize
  if (numberOfStairs <= 1) return 1; // @step:initialize
  const dpTable = new Array(numberOfStairs + 1).fill(0); // @step:initialize,fill-table
  dpTable[0] = 1; // @step:fill-table
  dpTable[1] = 1; // @step:fill-table
  // Each entry is the sum of the ways to arrive from one step below and two steps below
  for (let currentStep = 2; currentStep <= numberOfStairs; currentStep++) {
    // @step:compute-cell
    dpTable[currentStep] = dpTable[currentStep - 1] + dpTable[currentStep - 2]; // @step:compute-cell,read-cache
  }
  return dpTable[numberOfStairs]; // @step:complete
}
