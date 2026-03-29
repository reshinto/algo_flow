// Decode Ways tabulation — count decoding possibilities for a digit string bottom-up
function decodeWaysTabulation(digits: string): number {
  // @step:initialize
  const digitCount = digits.length; // @step:initialize
  if (digitCount === 0) return 0; // @step:initialize
  const dpTable = new Array(digitCount + 1).fill(0); // @step:initialize
  dpTable[0] = 1; // @step:fill-table
  // A string of one digit can be decoded iff it is not '0'
  dpTable[1] = digits[0] !== "0" ? 1 : 0; // @step:fill-table
  for (let position = 2; position <= digitCount; position++) {
    // @step:read-cache
    const singleDigit = Number(digits[position - 1]); // @step:read-cache
    if (singleDigit >= 1 && singleDigit <= 9) {
      // @step:read-cache
      dpTable[position] += dpTable[position - 1]!; // @step:read-cache
    }
    const twoDigitValue = Number(digits.slice(position - 2, position)); // @step:read-cache
    if (twoDigitValue >= 10 && twoDigitValue <= 26) {
      // @step:read-cache
      dpTable[position] += dpTable[position - 2]!; // @step:read-cache
    }
    // @step:compute-cell
  }
  return dpTable[digitCount]!; // @step:complete
}
