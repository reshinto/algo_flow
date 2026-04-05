// Implement Queue Using Stacks — use two stacks to emulate FIFO queue behaviour (LeetCode 232)
function implementQueueUsingStacks(values: number[]): number[] {
  const inputStack: number[] = []; // @step:initialize
  const outputStack: number[] = []; // @step:initialize
  const dequeueResults: number[] = []; // @step:initialize

  // Push phase — enqueue all values into the input stack
  for (let elementIdx = 0; elementIdx < values.length; elementIdx++) {
    const currentValue = values[elementIdx]!; // @step:visit
    inputStack.push(currentValue); // @step:push
  }

  // Dequeue phase — transfer when output stack is empty, then pop
  while (inputStack.length > 0 || outputStack.length > 0) {
    if (outputStack.length === 0) {
      // Transfer all elements from input stack to output stack
      while (inputStack.length > 0) {
        const transferredValue = inputStack.pop()!; // @step:transfer
        outputStack.push(transferredValue); // @step:transfer
      }
    }
    const dequeuedValue = outputStack.pop()!; // @step:pop
    dequeueResults.push(dequeuedValue); // @step:pop
  }

  return dequeueResults; // @step:complete
}
