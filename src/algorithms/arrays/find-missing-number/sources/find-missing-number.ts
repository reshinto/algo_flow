// Find Missing Number — XOR approach: XOR all elements with expected range 0..n, pair cancellations leave the missing number
function findMissingNumber(inputArray: number[]): { missingNumber: number } {
  const arrayLength = inputArray.length; // @step:initialize
  let currentXor = 0; // @step:initialize

  for (let expectedRange = 0; expectedRange <= arrayLength; expectedRange++) {
    currentXor ^= expectedRange; // @step:compare
  }

  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    currentXor ^= inputArray[scanIndex]!; // @step:visit
  }

  return { missingNumber: currentXor }; // @step:complete
}
