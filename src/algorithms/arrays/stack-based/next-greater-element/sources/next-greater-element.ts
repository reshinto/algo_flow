// Next Greater Element — monotonic stack: for each element, find the next strictly greater element to its right
function nextGreaterElement(inputArray: number[]): number[] {
  const arrayLength = inputArray.length;
  const resultArray = new Array(arrayLength).fill(-1); // @step:initialize
  const pendingStack: number[] = []; // @step:initialize

  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    const currentElement = inputArray[scanIndex]!; // @step:visit

    while (pendingStack.length > 0) {
      const stackTop = pendingStack[pendingStack.length - 1]!; // @step:compare
      if (inputArray[stackTop]! < currentElement) {
        // @step:compare
        const poppedIndex = pendingStack.pop()!; // @step:compare
        resultArray[poppedIndex] = currentElement; // @step:compare
      } else {
        break;
      }
    }

    pendingStack.push(scanIndex); // @step:visit
  }

  return resultArray; // @step:complete
}
