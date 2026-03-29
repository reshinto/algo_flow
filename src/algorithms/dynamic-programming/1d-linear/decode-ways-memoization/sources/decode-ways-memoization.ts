// Decode Ways memoization — count decoding possibilities for a digit string top-down

function decodeWaysMemoization(digits: string, memo: Map<number, number> = new Map()): number {
  // @step:initialize
  const digitCount = digits.length; // @step:initialize
  if (digitCount === 0) return 0; // @step:initialize

  function decode(position: number): number {
    if (position === 0) return 1; // @step:fill-table
    if (memo.has(position)) return memo.get(position)!; // @step:read-cache
    // @step:push-call
    let ways = 0; // @step:compute-cell
    const singleDigit = Number(digits[position - 1]); // @step:compute-cell
    if (singleDigit >= 1 && singleDigit <= 9) {
      // @step:compute-cell
      ways += decode(position - 1); // @step:compute-cell
    }
    const twoDigitValue = Number(digits.slice(position - 2, position)); // @step:compute-cell
    if (position >= 2 && twoDigitValue >= 10 && twoDigitValue <= 26) {
      // @step:compute-cell
      ways += decode(position - 2); // @step:compute-cell
    }
    memo.set(position, ways); // @step:compute-cell
    return ways; // @step:pop-call
  }

  return decode(digitCount); // @step:complete
}
