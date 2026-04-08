// Missing Number — find the missing number in range [0, n] using a hash set
function missingNumber(numbers: number[]): number {
  const numberSet = new Set<number>(); // @step:initialize
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    numberSet.add(numbers[elementIndex]!); // @step:insert-key
  }
  for (let checkValue = 0; checkValue <= numbers.length; checkValue++) {
    if (!numberSet.has(checkValue)) {
      // @step:lookup-key
      return checkValue; // @step:key-not-found
    }
  }
  return -1; // @step:complete
}
