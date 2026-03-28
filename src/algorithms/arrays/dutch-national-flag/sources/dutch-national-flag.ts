// Dutch National Flag — O(n) 3-way partition using three pointers (low, mid, high)
function dutchNationalFlag(inputArray: number[]): number[] {
  const result = [...inputArray];
  let lowPointer = 0; // @step:initialize
  let midPointer = 0; // @step:initialize
  let highPointer = result.length - 1; // @step:initialize

  while (midPointer <= highPointer) {
    const currentValue = result[midPointer]!; // @step:compare

    if (currentValue === 0) {
      // @step:compare
      const tempValue = result[lowPointer]!; // @step:swap
      result[lowPointer] = result[midPointer]!; // @step:swap
      result[midPointer] = tempValue; // @step:swap
      lowPointer++; // @step:visit
      midPointer++; // @step:visit
    } else if (currentValue === 1) {
      // @step:compare
      midPointer++; // @step:visit
    } else {
      const tempValue = result[highPointer]!; // @step:swap
      result[highPointer] = result[midPointer]!; // @step:swap
      result[midPointer] = tempValue; // @step:swap
      highPointer--; // @step:visit
    }
  }

  return result; // @step:complete
}
