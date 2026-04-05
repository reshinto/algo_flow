// Sum of Subarray Minimums — for each element, compute its contribution as minimum across subarrays using monotonic stack
function sumOfSubarrayMinimums(arr: number[]): number {
  const MOD = 1_000_000_007; // @step:initialize
  const arrayLength = arr.length; // @step:initialize
  const leftDistances: number[] = new Array(arrayLength).fill(0); // @step:initialize
  const rightDistances: number[] = new Array(arrayLength).fill(0); // @step:initialize
  const indexStack: number[] = []; // @step:initialize

  // Compute left distances: distance to previous less element
  for (let elementIdx = 0; elementIdx < arrayLength; elementIdx++) {
    const currentValue = arr[elementIdx]!; // @step:visit
    // Pop while stack top has value >= current (not strictly less)
    while (indexStack.length > 0 && arr[indexStack[indexStack.length - 1]!]! >= currentValue) {
      // @step:compare
      indexStack.pop(); // @step:maintain-monotonic
    }
    leftDistances[elementIdx] =
      indexStack.length === 0 ? elementIdx + 1 : elementIdx - indexStack[indexStack.length - 1]!; // @step:resolve
    indexStack.push(elementIdx); // @step:push
  }

  indexStack.length = 0; // @step:initialize

  // Compute right distances: distance to next less-or-equal element
  for (let elementIdx = arrayLength - 1; elementIdx >= 0; elementIdx--) {
    const currentValue = arr[elementIdx]!; // @step:visit
    // Pop while stack top has value > current (strictly greater — allows equal on right)
    while (indexStack.length > 0 && arr[indexStack[indexStack.length - 1]!]! > currentValue) {
      // @step:compare
      indexStack.pop(); // @step:maintain-monotonic
    }
    rightDistances[elementIdx] =
      indexStack.length === 0
        ? arrayLength - elementIdx
        : indexStack[indexStack.length - 1]! - elementIdx; // @step:resolve
    indexStack.push(elementIdx); // @step:push
  }

  // Sum contributions: each element contributes arr[i] * left[i] * right[i]
  let result = 0; // @step:initialize
  for (let elementIdx = 0; elementIdx < arrayLength; elementIdx++) {
    result =
      (result + arr[elementIdx]! * leftDistances[elementIdx]! * rightDistances[elementIdx]!) % // @step:resolve
      MOD;
  }

  return result; // @step:complete
}
