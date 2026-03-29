// House Robber memoization — top-down recursion with cached subproblems

function houseRobberMemoization(houses: number[], memo: Map<number, number> = new Map()): number {
  // @step:initialize
  if (houses.length === 0) return 0; // @step:initialize
  if (houses.length === 1) return houses[0]!; // @step:initialize

  function rob(houseIndex: number): number {
    if (houseIndex === 0) {
      // @step:fill-table
      memo.set(0, houses[0]!); // @step:fill-table
      return houses[0]!; // @step:fill-table
    }
    if (houseIndex === 1) {
      // @step:fill-table
      const baseValue = Math.max(houses[0]!, houses[1]!); // @step:fill-table
      memo.set(1, baseValue); // @step:fill-table
      return baseValue; // @step:fill-table
    }
    if (memo.has(houseIndex)) return memo.get(houseIndex)!; // @step:read-cache
    // @step:push-call
    const skipCurrent = rob(houseIndex - 1); // @step:compute-cell
    const robCurrent = rob(houseIndex - 2) + houses[houseIndex]!; // @step:compute-cell
    const maxProfit = Math.max(skipCurrent, robCurrent); // @step:compute-cell
    memo.set(houseIndex, maxProfit); // @step:compute-cell
    return maxProfit; // @step:pop-call
  }

  return rob(houses.length - 1); // @step:complete
}
