// Library Sort (Gapped Insertion Sort) — insert into a gapped array, rebalance when gaps fill
function librarySort(inputArray: number[]): number[] {
  // @step:initialize
  const arrayLength = inputArray.length; // @step:initialize
  if (arrayLength <= 1) return [...inputArray]; // @step:initialize

  // Use a gap factor: allocate extra space for gaps between elements
  const gapFactor = 2;
  const gappedSize = arrayLength * gapFactor + 1; // @step:initialize
  const gappedArray: (number | null)[] = new Array(gappedSize).fill(null); // @step:initialize
  let filledCount = 0; // @step:initialize

  // Place the first element at the center of the gapped array
  const centerPosition = Math.floor(gappedSize / 2); // @step:initialize
  gappedArray[centerPosition] = inputArray[0]!; // @step:initialize
  filledCount = 1; // @step:initialize

  for (let outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
    const currentElement = inputArray[outerIndex]!; // @step:find-position

    // Collect sorted filled values to binary search among them
    const filledValues: number[] = []; // @step:find-position
    const filledPositions: number[] = []; // @step:find-position
    for (let scanIndex = 0; scanIndex < gappedSize; scanIndex++) {
      // @step:find-position
      if (gappedArray[scanIndex] !== null) {
        filledValues.push(gappedArray[scanIndex]!); // @step:find-position
        filledPositions.push(scanIndex); // @step:find-position
      }
    }

    // Binary search in filled values to find insertion rank
    let searchLeft = 0; // @step:compare
    let searchRight = filledValues.length - 1; // @step:compare
    let insertRank = filledValues.length; // @step:compare

    while (searchLeft <= searchRight) {
      // @step:compare
      const midRank = Math.floor((searchLeft + searchRight) / 2); // @step:compare
      if (currentElement < filledValues[midRank]!) {
        // @step:compare
        insertRank = midRank; // @step:compare
        searchRight = midRank - 1; // @step:compare
      } else {
        searchLeft = midRank + 1; // @step:compare
      }
    }

    // Determine insertion position in the gapped array
    // insertRank is where currentElement should go among filled elements
    let insertPosition: number; // @step:swap
    if (insertRank === 0) {
      // @step:swap
      insertPosition = filledPositions[0]!; // @step:swap
    } else if (insertRank >= filledPositions.length) {
      insertPosition = filledPositions[filledPositions.length - 1]! + 1; // @step:swap
    } else {
      // Insert between rank-1 and rank — pick the position after the rank-1 element
      insertPosition = filledPositions[insertRank - 1]! + 1; // @step:swap
    }

    // Clamp to valid range
    if (insertPosition >= gappedSize) insertPosition = gappedSize - 1; // @step:swap

    // Find a gap near the insertion position and insert
    // Search right for a null gap
    let rightSearch = insertPosition; // @step:swap
    while (rightSearch < gappedSize && gappedArray[rightSearch] !== null) rightSearch++; // @step:swap

    if (rightSearch < gappedSize) {
      // Shift elements right to open the gap at insertPosition
      for (let shiftPos = rightSearch; shiftPos > insertPosition; shiftPos--) {
        // @step:swap
        gappedArray[shiftPos] = gappedArray[shiftPos - 1]!; // @step:swap
      }
      gappedArray[insertPosition] = currentElement; // @step:swap
    } else {
      // No gap to the right — search left
      let leftSearch = insertPosition - 1; // @step:swap
      while (leftSearch >= 0 && gappedArray[leftSearch] !== null) leftSearch--; // @step:swap
      if (leftSearch >= 0) {
        for (let shiftPos = leftSearch; shiftPos < insertPosition - 1; shiftPos++) {
          // @step:swap
          gappedArray[shiftPos] = gappedArray[shiftPos + 1]!; // @step:swap
        }
        gappedArray[insertPosition - 1] = currentElement; // @step:swap
      }
    }
    filledCount++; // @step:swap

    // Rebalance (redistribute with gaps) if the array is more than half full
    if (filledCount >= Math.floor(gappedSize / 2)) {
      // @step:rebalance
      const filled: number[] = gappedArray.filter((val) => val !== null) as number[]; // @step:rebalance
      gappedArray.fill(null); // @step:rebalance
      const spacing = Math.floor(gappedSize / (filled.length + 1)); // @step:rebalance
      for (let rebalanceIndex = 0; rebalanceIndex < filled.length; rebalanceIndex++) {
        // @step:rebalance
        gappedArray[(rebalanceIndex + 1) * spacing] = filled[rebalanceIndex]!; // @step:rebalance
      }
    }

    // @step:mark-sorted
  }

  // Collect the result in order, filtering out nulls
  const resultArray = gappedArray.filter((val) => val !== null) as number[]; // @step:complete
  return resultArray; // @step:complete
}
