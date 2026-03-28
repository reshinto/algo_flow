// Three Sum — O(n^2) find all unique triplets that sum to zero using sort + two-pointer
function threeSum(inputArray: number[]): number[][] {
  const sortedArray = [...inputArray].sort((valueA, valueB) => valueA - valueB); // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  const triplets: number[][] = []; // @step:initialize

  for (
    let anchorIndex = 0;
    anchorIndex < arrayLength - 2;
    anchorIndex++ // @step:visit
  ) {
    // Skip duplicate anchor values to avoid duplicate triplets
    if (anchorIndex > 0 && sortedArray[anchorIndex] === sortedArray[anchorIndex - 1]) {
      // @step:compare
      continue; // @step:compare
    }

    let leftPointer = anchorIndex + 1; // @step:visit
    let rightPointer = arrayLength - 1; // @step:visit

    while (leftPointer < rightPointer) {
      // @step:compare
      const currentSum =
        sortedArray[anchorIndex]! + sortedArray[leftPointer]! + sortedArray[rightPointer]!; // @step:compare

      if (currentSum === 0) {
        // @step:compare
        triplets.push([
          sortedArray[anchorIndex]!,
          sortedArray[leftPointer]!,
          sortedArray[rightPointer]!,
        ]); // @step:visit

        // Advance both pointers and skip duplicates
        while (
          leftPointer < rightPointer &&
          sortedArray[leftPointer] === sortedArray[leftPointer + 1]
        ) {
          leftPointer++; // @step:compare
        }
        while (
          leftPointer < rightPointer &&
          sortedArray[rightPointer] === sortedArray[rightPointer - 1]
        ) {
          rightPointer--; // @step:compare
        }
        leftPointer++; // @step:visit
        rightPointer--; // @step:visit
      } else if (currentSum < 0) {
        leftPointer++; // @step:visit
      } else {
        rightPointer--; // @step:visit
      }
    }
  }

  return triplets; // @step:complete
}
