// Hash-Based Search — build a hash map for O(1) lookup after O(n) build phase
function hashSearch(array: number[], targetValue: number): number {
  // @step:initialize
  const hashMap = new Map<number, number>(); // @step:initialize

  // Build phase: insert every element into the hash map
  for (let elementIndex = 0; elementIndex < array.length; elementIndex++) {
    // @step:visit
    const elementValue = array[elementIndex]!; // @step:visit
    hashMap.set(elementValue, elementIndex); // @step:visit
  }

  // Search phase: O(1) lookup
  const resultIndex = hashMap.get(targetValue); // @step:compare
  if (resultIndex !== undefined) {
    // @step:compare,found
    return resultIndex; // @step:found
  }

  return -1; // @step:complete
}
