// Sliding Window Maximum — find the max in each window of size k using a monotonic deque of indices
function slidingWindowMaxMonotonic(nums: number[], windowSize: number): number[] {
  const deque: number[] = []; // @step:initialize
  const result: number[] = []; // @step:initialize
  for (let elementIdx = 0; elementIdx < nums.length; elementIdx++) {
    // @step:visit
    // Remove indices that have fallen outside the current window
    while (deque.length > 0 && deque[0]! <= elementIdx - windowSize) {
      // @step:dequeue
      deque.shift(); // @step:dequeue
    }
    // Maintain monotonic decreasing order — remove smaller elements from the rear
    while (deque.length > 0 && nums[deque[deque.length - 1]!]! <= nums[elementIdx]!) {
      // @step:maintain-monotonic
      deque.pop(); // @step:maintain-monotonic
    }
    deque.push(elementIdx); // @step:enqueue
    // Once the first full window is reached, record the maximum (front of deque)
    if (elementIdx >= windowSize - 1) {
      // @step:peek
      result.push(nums[deque[0]!]!); // @step:peek
    }
  }
  return result; // @step:complete
}
