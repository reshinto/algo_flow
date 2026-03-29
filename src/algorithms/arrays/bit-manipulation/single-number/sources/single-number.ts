// Single Number (XOR) — every element appears twice except one; XOR cancels all pairs, leaving the unique element
function singleNumber(inputArray: number[]): { uniqueElement: number } {
  let runningXor = 0; // @step:initialize

  for (let scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
    runningXor ^= inputArray[scanIndex]!; // @step:visit
  }

  return { uniqueElement: runningXor }; // @step:complete
}
