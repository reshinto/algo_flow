// Design Circular Queue — fixed-capacity ring buffer with front/rear pointers (LeetCode 622)
function designCircularQueue(operations: string[], capacity: number): string[] {
  const buffer: (number | null)[] = new Array(capacity).fill(null); // @step:initialize
  let frontIndex = -1; // @step:initialize
  let rearIndex = -1; // @step:initialize
  let queueSize = 0; // @step:initialize
  const results: string[] = []; // @step:initialize

  for (let operationIndex = 0; operationIndex < operations.length; operationIndex++) {
    const operation = operations[operationIndex]!; // @step:visit

    if (operation.startsWith("enqueue")) {
      const valueStr = operation.split(" ")[1]!; // @step:enqueue
      const value = parseInt(valueStr, 10); // @step:enqueue

      if (queueSize === capacity) {
        // @step:enqueue
        results.push("full"); // @step:enqueue
      } else {
        if (frontIndex === -1) {
          // @step:enqueue
          frontIndex = 0; // @step:enqueue
        }
        rearIndex = (rearIndex + 1) % capacity; // @step:enqueue
        buffer[rearIndex] = value; // @step:enqueue
        queueSize++; // @step:enqueue
        results.push("true"); // @step:enqueue
      }
    } else if (operation === "dequeue") {
      if (queueSize === 0) {
        // @step:dequeue
        results.push("empty"); // @step:dequeue
      } else {
        const dequeuedValue = buffer[frontIndex]!; // @step:dequeue
        buffer[frontIndex] = null; // @step:dequeue
        if (frontIndex === rearIndex) {
          // @step:dequeue
          frontIndex = -1; // @step:dequeue
          rearIndex = -1; // @step:dequeue
        } else {
          frontIndex = (frontIndex + 1) % capacity; // @step:dequeue
        }
        queueSize--; // @step:dequeue
        results.push(String(dequeuedValue)); // @step:dequeue
      }
    } else if (operation === "front") {
      if (frontIndex === -1) {
        // @step:peek
        results.push("empty"); // @step:peek
      } else {
        results.push(String(buffer[frontIndex])); // @step:peek
      }
    } else if (operation === "rear") {
      if (rearIndex === -1) {
        // @step:peek
        results.push("empty"); // @step:peek
      } else {
        results.push(String(buffer[rearIndex])); // @step:peek
      }
    }
  }

  return results; // @step:complete
}
