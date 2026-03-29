// Min Cost Climbing Stairs tabulation — minimum cost to reach the top
function minCostClimbingStairsTabulation(costs: number[]): number {
  // @step:initialize
  const stairCount = costs.length; // @step:initialize
  if (stairCount === 0) return 0; // @step:initialize
  const dpTable = new Array(stairCount + 1).fill(0); // @step:initialize,fill-table
  dpTable[0] = 0; // @step:fill-table
  dpTable[1] = 0; // @step:fill-table
  // Each entry is the minimum cost to reach that step from either one or two steps below
  for (let currentStep = 2; currentStep <= stairCount; currentStep++) {
    // @step:compute-cell
    dpTable[currentStep] = Math.min(
      dpTable[currentStep - 1] + costs[currentStep - 1], // @step:compute-cell,read-cache
      dpTable[currentStep - 2] + costs[currentStep - 2], // @step:compute-cell,read-cache
    );
  }
  return dpTable[stairCount]; // @step:complete
}
