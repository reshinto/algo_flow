// Contains Duplicate II — find if the same value appears within maxDistance index gap
export function containsDuplicateII(numbers: number[], maxDistance: number): boolean {
  const indexMap = new Map<number, number>(); // @step:initialize
  for (let currentIndex = 0; currentIndex < numbers.length; currentIndex++) {
    const current = numbers[currentIndex]!;
    if (indexMap.has(current)) {
      // @step:check-duplicate
      const storedIndex = indexMap.get(current)!;
      if (Math.abs(currentIndex - storedIndex) <= maxDistance) {
        // @step:key-found
        return true; // @step:key-found
      }
      // Too far apart — update stored index to keep closest occurrence
      indexMap.set(current, currentIndex); // @step:update-value
    } else {
      // First time seeing this value — store its index
      indexMap.set(current, currentIndex); // @step:insert-key
    }
  }
  return false; // @step:complete
}
