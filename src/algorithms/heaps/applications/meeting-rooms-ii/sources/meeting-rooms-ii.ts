// Meeting Rooms II — find minimum number of meeting rooms required using a min-heap of end times
function meetingRoomsII(intervals: [number, number][]): number {
  if (intervals.length === 0) return 0; // @step:initialize

  // Sort meetings by start time
  const sorted = [...intervals].sort((meetingA, meetingB) => meetingA[0] - meetingB[0]); // @step:initialize

  // Min-heap tracking end times of active meetings (room occupied until end time)
  const endTimeHeap: number[] = []; // @step:initialize

  for (const [startTime, endTime] of sorted) {
    if (endTimeHeap.length > 0 && endTimeHeap[0]! <= startTime) {
      // A room is free — extract its end time and reuse the room
      endTimeHeap[0] = endTimeHeap[endTimeHeap.length - 1]!; // @step:heap-extract
      endTimeHeap.pop(); // @step:heap-extract
      // Sift down to restore min-heap property after root replacement
      let parentIdx = 0; // @step:sift-down
      while (true) {
        let smallestIdx = parentIdx; // @step:sift-down
        const leftIdx = 2 * parentIdx + 1; // @step:sift-down
        const rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (leftIdx < endTimeHeap.length && endTimeHeap[leftIdx]! < endTimeHeap[smallestIdx]!) {
          // @step:compare
          smallestIdx = leftIdx;
        }
        if (rightIdx < endTimeHeap.length && endTimeHeap[rightIdx]! < endTimeHeap[smallestIdx]!) {
          // @step:compare
          smallestIdx = rightIdx;
        }
        if (smallestIdx === parentIdx) break; // @step:sift-down
        const swapTemp = endTimeHeap[parentIdx]!; // @step:heap-swap
        endTimeHeap[parentIdx] = endTimeHeap[smallestIdx]!; // @step:heap-swap
        endTimeHeap[smallestIdx] = swapTemp; // @step:heap-swap
        parentIdx = smallestIdx; // @step:sift-down
      }
    }

    // Insert current meeting's end time into the heap (allocate room)
    endTimeHeap.push(endTime); // @step:heap-insert
    let currentIdx = endTimeHeap.length - 1; // @step:heap-insert
    // Sift up to restore min-heap property
    while (currentIdx > 0) {
      // @step:sift-up
      const parentIdx = Math.floor((currentIdx - 1) / 2); // @step:sift-up
      if (endTimeHeap[currentIdx]! >= endTimeHeap[parentIdx]!) break; // @step:compare
      const swapTemp = endTimeHeap[currentIdx]!; // @step:heap-swap
      endTimeHeap[currentIdx] = endTimeHeap[parentIdx]!; // @step:heap-swap
      endTimeHeap[parentIdx] = swapTemp; // @step:heap-swap
      currentIdx = parentIdx; // @step:sift-up
    }
  }

  return endTimeHeap.length; // @step:complete
}
