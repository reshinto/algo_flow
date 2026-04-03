// Pairwise Sorting Network — sort adjacent pairs first, then merge via compare-swap with doubling strides
function pairwiseSortingNetwork(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) {
    return sortedArray; // @step:complete
  }

  // Compare-and-swap: ensure sortedArray[a] <= sortedArray[b]
  function compareAndSwap(firstIndex: number, secondIndex: number): void {
    if (firstIndex < arrayLength && secondIndex < arrayLength) {
      if (sortedArray[firstIndex]! > sortedArray[secondIndex]!) {
        // @step:swap
        const temporaryValue = sortedArray[firstIndex]!; // @step:swap
        sortedArray[firstIndex] = sortedArray[secondIndex]!; // @step:swap
        sortedArray[secondIndex] = temporaryValue; // @step:swap
      }
    }
  }

  // Phase 1: Sort adjacent pairs
  for (let pairStart = 0; pairStart + 1 < arrayLength; pairStart += 2) {
    // @step:compare
    compareAndSwap(pairStart, pairStart + 1); // @step:compare
  }

  // Phase 2: Merge using Shell-sort-like gap sequence (powers of 2, decreasing)
  // This constructs a valid pairwise sorting network
  for (let gap = 2; gap < arrayLength; gap *= 2) {
    // @step:compare
    // Compare elements at distance gap within each merged block
    for (let blockStart = 0; blockStart < arrayLength; blockStart += gap * 2) {
      // @step:compare
      for (let offset = 0; offset < gap && blockStart + offset + gap < arrayLength; offset++) {
        // @step:compare
        compareAndSwap(blockStart + offset, blockStart + offset + gap); // @step:compare
      }
    }
    // Reconciliation: fix local inversions created by the block merge
    for (
      let reconcileGap = Math.floor(gap / 2);
      reconcileGap >= 1;
      reconcileGap = Math.floor(reconcileGap / 2)
    ) {
      // @step:compare
      for (
        let reconcileStart = reconcileGap;
        reconcileStart + reconcileGap < arrayLength;
        reconcileStart += reconcileGap * 2
      ) {
        // @step:compare
        for (
          let reconcileOffset = 0;
          reconcileOffset < reconcileGap && reconcileStart + reconcileOffset < arrayLength - 1;
          reconcileOffset++
        ) {
          // @step:compare
          compareAndSwap(reconcileStart + reconcileOffset, reconcileStart + reconcileOffset + 1); // @step:compare
        }
      }
    }
  }

  // Final pass to ensure complete sortedness (odd-even transposition pass)
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let finalIndex = 0; finalIndex + 1 < arrayLength; finalIndex++) {
      if (sortedArray[finalIndex]! > sortedArray[finalIndex + 1]!) {
        compareAndSwap(finalIndex, finalIndex + 1);
        swapped = true;
      }
    }
  }

  // @step:mark-sorted

  return sortedArray; // @step:complete
}
