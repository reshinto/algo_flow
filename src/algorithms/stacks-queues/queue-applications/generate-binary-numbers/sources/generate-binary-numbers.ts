// Generate Binary Numbers — use a BFS-style queue to produce binary representations of 1 through N
function generateBinaryNumbers(count: number): string[] {
  const queue: string[] = ["1"]; // @step:initialize
  const result: string[] = []; // @step:initialize
  for (let generationIdx = 0; generationIdx < count; generationIdx++) {
    const current = queue.shift()!; // @step:dequeue
    result.push(current); // @step:dequeue
    queue.push(current + "0"); // @step:enqueue
    queue.push(current + "1"); // @step:enqueue
  }
  return result; // @step:complete
}
