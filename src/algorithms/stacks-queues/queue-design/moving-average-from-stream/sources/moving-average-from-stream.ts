// Moving Average from Data Stream — fixed-size sliding window queue (LeetCode 346)
function movingAverageFromStream(values: number[], windowSize: number): number[] {
  const queue: number[] = []; // @step:initialize
  let runningSum = 0; // @step:initialize
  const averages: number[] = []; // @step:initialize

  for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
    const currentValue = values[valueIndex]!; // @step:visit

    queue.push(currentValue); // @step:enqueue
    runningSum += currentValue; // @step:enqueue

    if (queue.length > windowSize) {
      // @step:dequeue
      runningSum -= queue.shift()!; // @step:dequeue
    }

    averages.push(runningSum / queue.length); // @step:complete
  }

  return averages; // @step:complete
}
