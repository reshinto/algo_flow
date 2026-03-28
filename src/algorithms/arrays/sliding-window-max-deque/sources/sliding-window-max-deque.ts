// Sliding Window Maximum (Deque) — O(n) monotonic decreasing deque
function slidingWindowMaxDeque(inputArray: number[], windowSize: number): number[] {
  const arrayLength = inputArray.length;
  if (arrayLength === 0 || windowSize <= 0 || windowSize > arrayLength) {
    // @step:initialize
    return []; // @step:initialize
  }

  const result: number[] = []; // @step:initialize
  const deque: number[] = []; // @step:initialize — stores indices, front = max of current window

  for (let currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
    // Remove indices outside the current window from the front
    while (deque.length > 0 && deque[0]! < currentIndex - windowSize + 1) {
      // @step:compare
      deque.shift(); // @step:visit
    }

    // Remove indices of elements smaller than the current element from the back
    while (deque.length > 0 && inputArray[deque[deque.length - 1]!]! < inputArray[currentIndex]!) {
      // @step:compare
      deque.pop(); // @step:visit
    }

    deque.push(currentIndex); // @step:visit

    // The window is fully formed once currentIndex >= windowSize - 1
    if (currentIndex >= windowSize - 1) {
      // @step:compare
      result.push(inputArray[deque[0]!]!); // @step:visit
    }
  }

  return result; // @step:complete
}
