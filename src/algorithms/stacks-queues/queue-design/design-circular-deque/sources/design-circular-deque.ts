// Design Circular Deque — fixed-capacity ring buffer with front/rear insertion and removal (LeetCode 641)
function designCircularDeque(operations: string[], capacity: number): string[] {
  const buffer: (number | null)[] = new Array(capacity).fill(null); // @step:initialize
  let frontIndex = -1; // @step:initialize
  let rearIndex = -1; // @step:initialize
  let dequeSize = 0; // @step:initialize
  const results: string[] = []; // @step:initialize

  for (let operationIndex = 0; operationIndex < operations.length; operationIndex++) {
    const operation = operations[operationIndex]!; // @step:visit

    if (operation.startsWith("pushBack")) {
      const valueStr = operation.split(" ")[1]!; // @step:enqueue
      const value = parseInt(valueStr, 10); // @step:enqueue

      if (dequeSize === capacity) {
        // @step:enqueue
        results.push("full"); // @step:enqueue
      } else {
        if (frontIndex === -1) {
          // @step:enqueue
          frontIndex = 0; // @step:enqueue
        }
        rearIndex = (rearIndex + 1) % capacity; // @step:enqueue
        buffer[rearIndex] = value; // @step:enqueue
        dequeSize++; // @step:enqueue
        results.push("true"); // @step:enqueue
      }
    } else if (operation.startsWith("pushFront")) {
      const valueStr = operation.split(" ")[1]!; // @step:enqueue-front
      const value = parseInt(valueStr, 10); // @step:enqueue-front

      if (dequeSize === capacity) {
        // @step:enqueue-front
        results.push("full"); // @step:enqueue-front
      } else {
        if (frontIndex === -1) {
          // @step:enqueue-front
          frontIndex = 0; // @step:enqueue-front
          rearIndex = 0; // @step:enqueue-front
        } else {
          frontIndex = (frontIndex - 1 + capacity) % capacity; // @step:enqueue-front
        }
        buffer[frontIndex] = value; // @step:enqueue-front
        dequeSize++; // @step:enqueue-front
        results.push("true"); // @step:enqueue-front
      }
    } else if (operation === "popFront") {
      if (dequeSize === 0) {
        // @step:dequeue
        results.push("empty"); // @step:dequeue
      } else {
        const poppedValue = buffer[frontIndex]!; // @step:dequeue
        buffer[frontIndex] = null; // @step:dequeue
        if (frontIndex === rearIndex) {
          // @step:dequeue
          frontIndex = -1; // @step:dequeue
          rearIndex = -1; // @step:dequeue
        } else {
          frontIndex = (frontIndex + 1) % capacity; // @step:dequeue
        }
        dequeSize--; // @step:dequeue
        results.push(String(poppedValue)); // @step:dequeue
      }
    } else if (operation === "popBack") {
      if (dequeSize === 0) {
        // @step:dequeue-rear
        results.push("empty"); // @step:dequeue-rear
      } else {
        const poppedValue = buffer[rearIndex]!; // @step:dequeue-rear
        buffer[rearIndex] = null; // @step:dequeue-rear
        if (frontIndex === rearIndex) {
          // @step:dequeue-rear
          frontIndex = -1; // @step:dequeue-rear
          rearIndex = -1; // @step:dequeue-rear
        } else {
          rearIndex = (rearIndex - 1 + capacity) % capacity; // @step:dequeue-rear
        }
        dequeSize--; // @step:dequeue-rear
        results.push(String(poppedValue)); // @step:dequeue-rear
      }
    } else if (operation === "peekFront") {
      if (frontIndex === -1) {
        // @step:peek
        results.push("empty"); // @step:peek
      } else {
        results.push(String(buffer[frontIndex])); // @step:peek
      }
    } else if (operation === "peekRear") {
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
