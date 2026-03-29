// Count Bits tabulation — dp[i] = number of 1-bits in binary representation of i
function countBits(targetNumber: number): number[] {
  // @step:initialize
  const dpTable = new Array(targetNumber + 1).fill(0); // @step:initialize,fill-table
  // dp[0] = 0: zero has no set bits
  for (let bitIndex = 1; bitIndex <= targetNumber; bitIndex++) {
    // @step:compute-cell
    // Half the number shares all bits except possibly the LSB
    dpTable[bitIndex] = dpTable[bitIndex >> 1] + (bitIndex & 1); // @step:compute-cell,read-cache
  }
  return dpTable; // @step:complete
}
