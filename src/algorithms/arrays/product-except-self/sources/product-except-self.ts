// Product of Array Except Self — O(n) two-pass prefix/suffix product (no division)
function productExceptSelf(inputArray: number[]): number[] {
  const arrayLength = inputArray.length; // @step:initialize
  if (arrayLength === 0) {
    // @step:initialize
    return []; // @step:initialize
  }

  const resultArray: number[] = new Array(arrayLength).fill(1); // @step:initialize

  // Left pass: resultArray[index] = product of all elements to the left
  let prefixProduct = 1; // @step:visit
  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    // @step:visit
    resultArray[scanIndex] = prefixProduct; // @step:visit
    prefixProduct *= inputArray[scanIndex]!; // @step:visit
  }

  // Right pass: multiply each position by the product of all elements to the right
  let suffixProduct = 1; // @step:visit
  for (let scanIndex = arrayLength - 1; scanIndex >= 0; scanIndex--) {
    // @step:visit
    resultArray[scanIndex]! *= suffixProduct; // @step:visit
    suffixProduct *= inputArray[scanIndex]!; // @step:visit
  }

  return resultArray; // @step:complete
}
