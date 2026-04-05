// First Non-Repeating Char Stream — use a queue as candidate buffer and a frequency map to find the first non-repeating character at each step
function firstNonRepeatingCharStream(inputString: string): string[] {
  const freqMap: Record<string, number> = {}; // @step:initialize
  const queue: string[] = []; // @step:initialize
  const results: string[] = []; // @step:initialize
  for (let charIdx = 0; charIdx < inputString.length; charIdx++) {
    const char = inputString[charIdx]!; // @step:visit
    freqMap[char] = (freqMap[char] ?? 0) + 1; // @step:visit
    queue.push(char); // @step:enqueue
    // Remove repeated characters from the front of the queue
    while (queue.length > 0 && (freqMap[queue[0]!] ?? 0) > 1) {
      queue.shift(); // @step:dequeue
    }
    const answer = queue.length > 0 ? queue[0]! : "#"; // @step:peek
    results.push(answer); // @step:peek
  }
  return results; // @step:complete
}
