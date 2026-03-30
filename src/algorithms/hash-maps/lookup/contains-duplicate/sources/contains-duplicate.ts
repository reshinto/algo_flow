// Contains Duplicate — determine if any value appears at least twice using a hash set
export function containsDuplicate(numbers: number[]): boolean {
  const seen = new Set<number>(); // @step:initialize
  for (let elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
    const current = numbers[elementIndex]!;
    if (seen.has(current)) {
      // @step:key-found
      return true; // @step:key-found
    }
    // Not seen yet — record it for future duplicate checks
    seen.add(current); // @step:insert-key
  }
  return false; // @step:complete
}
