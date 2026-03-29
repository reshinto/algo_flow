// House Robber tabulation — build DP table iteratively from base cases
function houseRobberTabulation(houses: number[]): number {
  // @step:initialize
  if (houses.length === 0) return 0; // @step:initialize
  if (houses.length === 1) return houses[0]!; // @step:initialize,fill-table
  const dpTable = new Array(houses.length).fill(0); // @step:initialize,fill-table
  dpTable[0] = houses[0]; // @step:fill-table
  dpTable[1] = Math.max(houses[0]!, houses[1]!); // @step:fill-table
  // Each entry is max(rob current + dp[i-2], skip current = dp[i-1])
  for (let houseIndex = 2; houseIndex < houses.length; houseIndex++) {
    // @step:compute-cell
    dpTable[houseIndex] = Math.max(
      dpTable[houseIndex - 1]!,
      dpTable[houseIndex - 2]! + houses[houseIndex]!,
    ); // @step:compute-cell,read-cache
  }
  return dpTable[houses.length - 1]!; // @step:complete
}
