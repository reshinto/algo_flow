// Longest Consecutive Sequence — find the length of the longest consecutive run using a hash set
function longestConsecutiveSequence(numbers: number[]): number {
  const numSet = new Set<number>(); // @step:initialize
  for (let buildIdx = 0; buildIdx < numbers.length; buildIdx++) {
    numSet.add(numbers[buildIdx]!); // @step:insert-key
  }
  let maxLength = 0;
  for (let scanIdx = 0; scanIdx < numbers.length; scanIdx++) {
    const currentNumber = numbers[scanIdx]!;
    if (!numSet.has(currentNumber - 1)) {
      // @step:lookup-key
      // This number is a sequence start — count forward
      let sequenceLength = 1;
      let nextNumber = currentNumber + 1;
      while (numSet.has(nextNumber)) {
        // @step:key-found
        sequenceLength++;
        nextNumber++;
      }
      maxLength = Math.max(maxLength, sequenceLength); // @step:key-not-found
    }
  }
  return maxLength; // @step:complete
}
