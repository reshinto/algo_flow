// Min Stack — maintain a main stack paired with an auxiliary min-tracking stack for O(1) getMin
function minStack(values: number[]): number {
  const mainStack: number[] = []; // @step:initialize
  const minTracker: number[] = []; // @step:initialize

  for (let elementIdx = 0; elementIdx < values.length; elementIdx++) {
    const currentValue = values[elementIdx]!; // @step:visit

    mainStack.push(currentValue); // @step:push

    // Maintain auxiliary min stack: duplicate current min if new value is not smaller
    if (minTracker.length === 0 || currentValue <= minTracker[minTracker.length - 1]!) {
      // @step:compare
      minTracker.push(currentValue); // @step:push-auxiliary
    } else {
      minTracker.push(minTracker[minTracker.length - 1]!); // @step:push-auxiliary
    }
  }

  // The top of minTracker always holds the current minimum
  return minTracker[minTracker.length - 1]!; // @step:peek,complete
}
