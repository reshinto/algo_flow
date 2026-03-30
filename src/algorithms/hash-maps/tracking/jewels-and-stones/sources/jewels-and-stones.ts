// Jewels and Stones — count how many stones are also jewels using a hash set
function jewelsAndStones(jewels: string, stones: string): number {
  const jewelSet = new Set<string>(); // @step:initialize
  for (let jewelIdx = 0; jewelIdx < jewels.length; jewelIdx++) {
    jewelSet.add(jewels[jewelIdx]!); // @step:insert-key
  }
  let count = 0;
  for (let stoneIdx = 0; stoneIdx < stones.length; stoneIdx++) {
    const stone = stones[stoneIdx]!;
    if (jewelSet.has(stone)) {
      // @step:lookup-key
      count++; // @step:key-found
    } else {
      // @step:key-not-found
      void stone;
    }
  }
  return count; // @step:complete
}
