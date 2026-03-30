// Find All Duplicates — find all elements that appear twice using a hash set
function findAllDuplicates(numbers: number[]): number[] {
  const seenSet = new Set<number>(); // @step:initialize
  const duplicates: number[] = [];
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const currentNum = numbers[elementIndex]!;
    if (seenSet.has(currentNum)) {
      // @step:check-duplicate
      duplicates.push(currentNum); // @step:key-found
    } else {
      seenSet.add(currentNum); // @step:insert-key
    }
  }
  return duplicates; // @step:complete
}

export { findAllDuplicates };
