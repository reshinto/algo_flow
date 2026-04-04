// Strand Sort — repeatedly extract sorted sublists (strands) from input and merge into output
function strandSort(inputArray: number[]): number[] {
  // @step:initialize
  const remainingArray = [...inputArray]; // @step:initialize
  const arrayLength = remainingArray.length; // @step:initialize

  if (arrayLength <= 1) return [...remainingArray]; // @step:initialize

  let outputArray: number[] = []; // @step:initialize

  while (remainingArray.length > 0) {
    // Extract a strand: pick elements forming an ascending sequence
    const strand: number[] = [remainingArray[0]!]; // @step:extract-strand
    const leftover: number[] = []; // @step:extract-strand

    for (let scanIndex = 1; scanIndex < remainingArray.length; scanIndex++) {
      // @step:compare
      if (remainingArray[scanIndex]! >= strand[strand.length - 1]!) {
        // @step:compare
        strand.push(remainingArray[scanIndex]!); // @step:extract-strand
      } else {
        leftover.push(remainingArray[scanIndex]!); // @step:extract-strand
      }
    }

    // Merge the extracted strand into the output array
    outputArray = mergeTwoSortedArrays(outputArray, strand); // @step:merge-strand

    // Update remaining to only contain elements not in strand
    remainingArray.length = 0;
    remainingArray.push(...leftover); // @step:extract-strand
  }

  // Copy the sorted output back (so we return a fresh array)
  for (let finalIndex = 0; finalIndex < outputArray.length; finalIndex++) {
    // @step:mark-sorted
  }

  return outputArray; // @step:complete
}

function mergeTwoSortedArrays(leftArray: number[], rightArray: number[]): number[] {
  const merged: number[] = [];
  let leftPointer = 0;
  let rightPointer = 0;

  while (leftPointer < leftArray.length && rightPointer < rightArray.length) {
    if (leftArray[leftPointer]! <= rightArray[rightPointer]!) {
      merged.push(leftArray[leftPointer]!);
      leftPointer++;
    } else {
      merged.push(rightArray[rightPointer]!);
      rightPointer++;
    }
  }

  while (leftPointer < leftArray.length) {
    merged.push(leftArray[leftPointer]!);
    leftPointer++;
  }

  while (rightPointer < rightArray.length) {
    merged.push(rightArray[rightPointer]!);
    rightPointer++;
  }

  return merged;
}
