// 0/1 Knapsack (Tabulation) — max value from items with weight/value pairs within capacity
function knapsack01(weights: number[], values: number[], capacity: number): number {
  // @step:initialize
  const itemCount = weights.length; // @step:initialize
  const dpTable = new Array(capacity + 1).fill(0); // @step:initialize,fill-table
  // For each item, iterate capacity right-to-left to enforce 0/1 constraint
  for (let itemIndex = 0; itemIndex < itemCount; itemIndex++) {
    // @step:compute-cell
    const itemWeight = weights[itemIndex]; // @step:compute-cell
    const itemValue = values[itemIndex]; // @step:compute-cell
    for (let capacity_w = capacity; capacity_w >= itemWeight; capacity_w--) {
      // @step:read-cache
      const withoutItem = dpTable[capacity_w]; // @step:read-cache
      const withItem = dpTable[capacity_w - itemWeight] + itemValue; // @step:read-cache
      if (withItem > withoutItem) {
        dpTable[capacity_w] = withItem; // @step:compute-cell
      }
    }
  }
  return dpTable[capacity]; // @step:complete
}
