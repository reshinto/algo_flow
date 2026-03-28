// Move Zeros to End — O(n) two-pointer: write pointer tracks next write position, read pointer scans
function moveZeros(inputArray: number[]): number[] {
  const result = [...inputArray];
  let writePointer = 0; // @step:initialize

  for (let readPointer = 0; readPointer < result.length; readPointer++) {
    const currentElement = result[readPointer]!; // @step:compare
    if (currentElement !== 0) {
      // @step:compare
      const tempValue = result[writePointer]!; // @step:swap
      result[writePointer] = currentElement; // @step:swap
      result[readPointer] = tempValue; // @step:swap
      writePointer++; // @step:visit
    }
  }

  return result; // @step:complete
}
