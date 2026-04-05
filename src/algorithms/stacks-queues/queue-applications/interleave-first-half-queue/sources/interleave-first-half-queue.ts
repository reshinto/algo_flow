// Interleave First Half Queue — interleave the first half of a queue with the second half using a stack
function interleaveFirstHalfQueue(values: number[]): number[] {
  const queue: number[] = [...values]; // @step:initialize
  const halfSize = Math.floor(values.length / 2); // @step:initialize
  const stack: number[] = []; // @step:initialize

  // Step 1: Dequeue first half into stack
  for (let fillIdx = 0; fillIdx < halfSize; fillIdx++) {
    stack.push(queue.shift()!); // @step:push
  }

  // Step 2: Enqueue stack elements back to queue (reverses first half)
  while (stack.length > 0) {
    queue.push(stack.pop()!); // @step:enqueue
  }

  // Step 3: Dequeue second half and enqueue back (move original second half to rear)
  for (let rotateIdx = 0; rotateIdx < halfSize; rotateIdx++) {
    queue.push(queue.shift()!); // @step:transfer
  }

  // Step 4: Dequeue first half (originally first half, now at front) into stack
  for (let refillIdx = 0; refillIdx < halfSize; refillIdx++) {
    stack.push(queue.shift()!); // @step:push
  }

  // Step 5: Interleave — alternately pop from stack and dequeue from queue
  const result: number[] = []; // @step:initialize
  while (stack.length > 0) {
    result.push(stack.pop()!); // @step:pop
    result.push(queue.shift()!); // @step:dequeue
  }
  if (queue.length > 0) {
    result.push(queue.shift()!); // @step:dequeue
  }

  return result; // @step:complete
}
