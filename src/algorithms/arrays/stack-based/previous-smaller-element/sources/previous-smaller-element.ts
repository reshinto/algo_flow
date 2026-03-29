// Previous Smaller Element — monotonic stack: for each element, find the nearest element to the LEFT that is strictly smaller, or -1
function previousSmallerElement(inputArray: number[]): number[] {
  const arrayLength = inputArray.length;
  const resultArray = new Array(arrayLength).fill(-1); // @step:initialize
  const increasingStack: number[] = []; // @step:initialize

  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    const currentElement = inputArray[scanIndex]!; // @step:visit

    // Pop elements from the stack that are >= currentElement (they cannot be the answer)
    while (increasingStack.length > 0) {
      const stackTop = increasingStack[increasingStack.length - 1]!; // @step:compare
      if (inputArray[stackTop]! >= currentElement) {
        // @step:compare
        increasingStack.pop(); // @step:compare
      } else {
        break;
      }
    }

    // The new stack top (if any) is the nearest smaller element to the left
    if (increasingStack.length > 0) {
      const nearestSmallerIndex = increasingStack[increasingStack.length - 1]!; // @step:visit
      resultArray[scanIndex] = inputArray[nearestSmallerIndex]!; // @step:visit
    }

    increasingStack.push(scanIndex); // @step:visit
  }

  return resultArray; // @step:complete
}
