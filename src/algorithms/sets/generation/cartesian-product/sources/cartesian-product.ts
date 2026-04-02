// Cartesian Product
// Generates all ordered pairs (a, b) where a ∈ setA and b ∈ setB.
// Time: O(n × m) — one pair per combination of elements
// Space: O(n × m) for the result array

function cartesianProduct(setA: number[], setB: number[]): number[][] {
  const result: number[][] = []; // @step:initialize

  for (const elemA of setA) {
    for (const elemB of setB) {
      result.push([elemA, elemB]); // @step:generate-pair
    }
  }

  return result; // @step:complete
}
