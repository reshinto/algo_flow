// Number of Recent Calls — count calls in a 3000ms sliding window using a queue (LeetCode 933)
function numberOfRecentCalls(timestamps: number[]): number[] {
  const queue: number[] = []; // @step:initialize
  const results: number[] = []; // @step:initialize

  for (let timestampIdx = 0; timestampIdx < timestamps.length; timestampIdx++) {
    const currentTimestamp = timestamps[timestampIdx]!; // @step:visit

    queue.push(currentTimestamp); // @step:enqueue

    // Remove timestamps outside the 3000ms window
    while (queue[0]! < currentTimestamp - 3000) {
      queue.shift(); // @step:dequeue
    }

    results.push(queue.length); // @step:complete
  }

  return results; // @step:complete
}
