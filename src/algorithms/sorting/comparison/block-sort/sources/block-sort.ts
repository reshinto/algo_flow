// Block Sort (WikiSort) — in-place stable merge sort using rotation-based merging without extra memory
function blockSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) return sortedArray; // @step:initialize

  // Reverse elements in sortedArray[startIndex..endIndex] in place
  function reverseSegment(startIndex: number, endIndex: number): void {
    // @step:rotate
    let low = startIndex;
    let high = endIndex;
    while (low < high) {
      // @step:swap
      const temporaryValue = sortedArray[low]!; // @step:swap
      sortedArray[low] = sortedArray[high]!; // @step:swap
      sortedArray[high] = temporaryValue; // @step:swap
      low++;
      high--;
    }
  }

  // Rotate a subarray [leftStart..rightEnd] so that [midPoint..rightEnd] comes before [leftStart..midPoint-1]
  // Uses the three-reversal technique: reverse left, reverse right, reverse whole.
  function rotateLeft(leftStart: number, midPoint: number, rightEnd: number): void {
    // @step:rotate
    reverseSegment(leftStart, midPoint - 1);
    reverseSegment(midPoint, rightEnd);
    reverseSegment(leftStart, rightEnd);
  }

  // In-place stable merge of two adjacent sorted runs
  function mergeInPlace(runStart: number, runMid: number, runEnd: number): void {
    // @step:merge
    if (runStart >= runMid || runMid > runEnd) return; // @step:merge

    let leftPointer = runStart;
    let rightPointer = runMid;

    while (leftPointer < rightPointer && rightPointer <= runEnd) {
      // @step:compare
      if (sortedArray[leftPointer]! <= sortedArray[rightPointer]!) {
        // @step:compare
        leftPointer++; // Left element already in correct position
      } else {
        // Find how far to rotate
        let insertionPoint = rightPointer;
        while (
          insertionPoint <= runEnd &&
          sortedArray[insertionPoint]! < sortedArray[leftPointer]!
        ) {
          // @step:compare
          insertionPoint++;
        }

        // Rotate the segment to bring right-run elements into position
        const segmentLength = insertionPoint - leftPointer;
        const rightSegmentLength = insertionPoint - rightPointer;
        rotateLeft(leftPointer, rightPointer, insertionPoint - 1); // @step:rotate

        leftPointer += rightSegmentLength;
        rightPointer = insertionPoint;
      }
    }
  }

  // Find natural sorted runs in the array
  const runs: [number, number][] = []; // [startIndex, endIndex]
  let runStart = 0;

  for (let scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
    // @step:find-runs
    if (sortedArray[scanIndex]! < sortedArray[scanIndex - 1]!) {
      // @step:compare
      runs.push([runStart, scanIndex - 1]); // @step:find-runs
      runStart = scanIndex;
    }
  }
  runs.push([runStart, arrayLength - 1]); // @step:find-runs

  // Merge adjacent runs iteratively (bottom-up merge sort style)
  while (runs.length > 1) {
    // @step:merge
    const mergedRuns: [number, number][] = [];

    for (let runIndex = 0; runIndex < runs.length; runIndex += 2) {
      if (runIndex + 1 < runs.length) {
        const leftRun = runs[runIndex]!;
        const rightRun = runs[runIndex + 1]!;

        mergeInPlace(leftRun[0], rightRun[0], rightRun[1]); // @step:merge

        mergedRuns.push([leftRun[0], rightRun[1]]);
      } else {
        mergedRuns.push(runs[runIndex]!);
      }
    }

    runs.length = 0;
    runs.push(...mergedRuns);
  }

  // Mark all elements as sorted
  for (let sortedIndex = 0; sortedIndex < arrayLength; sortedIndex++) {
    // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
