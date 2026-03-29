// Rotate Array (Reversal Method) — O(n) three-reversal technique with O(1) space
function rotateArray(inputArray: number[], rotateCount: number): number[] {
  const result = [...inputArray];
  const arrayLength = result.length;

  if (arrayLength === 0) {
    return result; // @step:initialize
  }

  const effectiveRotation = rotateCount % arrayLength; // @step:initialize

  if (effectiveRotation === 0) {
    return result; // @step:initialize
  }

  // Phase 1: reverse entire array
  let leftPointer = 0; // @step:initialize
  let rightPointer = arrayLength - 1; // @step:initialize

  while (leftPointer < rightPointer) {
    const tempValue = result[leftPointer]!; // @step:swap
    result[leftPointer] = result[rightPointer]!; // @step:swap
    result[rightPointer] = tempValue; // @step:swap
    leftPointer++; // @step:visit
    rightPointer--; // @step:visit
  }

  // Phase 2: reverse first effectiveRotation elements
  leftPointer = 0; // @step:initialize
  rightPointer = effectiveRotation - 1; // @step:initialize

  while (leftPointer < rightPointer) {
    const tempValue = result[leftPointer]!; // @step:swap
    result[leftPointer] = result[rightPointer]!; // @step:swap
    result[rightPointer] = tempValue; // @step:swap
    leftPointer++; // @step:visit
    rightPointer--; // @step:visit
  }

  // Phase 3: reverse remaining elements
  leftPointer = effectiveRotation; // @step:initialize
  rightPointer = arrayLength - 1; // @step:initialize

  while (leftPointer < rightPointer) {
    const tempValue = result[leftPointer]!; // @step:swap
    result[leftPointer] = result[rightPointer]!; // @step:swap
    result[rightPointer] = tempValue; // @step:swap
    leftPointer++; // @step:visit
    rightPointer--; // @step:visit
  }

  return result; // @step:complete
}
