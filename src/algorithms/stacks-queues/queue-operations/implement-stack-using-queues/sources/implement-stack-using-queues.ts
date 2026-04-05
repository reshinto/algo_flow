// Implement Stack Using Queues — use one queue to emulate LIFO stack behaviour (LeetCode 225)
function implementStackUsingQueues(values: number[]): number[] {
  const queue: number[] = []; // @step:initialize
  const popResults: number[] = []; // @step:initialize

  // Push phase — enqueue each value, then rotate all prior elements behind it
  for (let elementIdx = 0; elementIdx < values.length; elementIdx++) {
    const currentValue = values[elementIdx]!; // @step:visit
    queue.push(currentValue); // @step:enqueue
    // Rotate: move every element that was there before the new one to the back
    for (let rotationIdx = 0; rotationIdx < queue.length - 1; rotationIdx++) {
      const transferred = queue.shift()!; // @step:transfer
      queue.push(transferred); // @step:transfer
    }
  }

  // Pop phase — front of queue is always the most-recently pushed element (LIFO)
  while (queue.length > 0) {
    const poppedValue = queue.shift()!; // @step:dequeue
    popResults.push(poppedValue); // @step:dequeue
  }

  return popResults; // @step:complete
}
