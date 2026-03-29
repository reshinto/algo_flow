// Two Sum — find two indices whose values add up to the target using a hash map
function twoSum(numbers: number[], target: number): [number, number] {
  const map = new Map<number, number>(); // @step:initialize
  for (let idx = 0; idx < numbers.length; idx++) {
    const complement = target - numbers[idx]!; // @step:lookup-key
    if (map.has(complement)) {
      // @step:key-found
      return [map.get(complement)!, idx]; // @step:key-found
    }
    // Complement not found — store current number for future lookups
    map.set(numbers[idx]!, idx); // @step:insert-key
  }
  return [-1, -1]; // @step:complete
}
