// Four Sum — finds all unique quadruplets summing to target via sorting and two-pointer reduction
function fourSum(inputArray: number[], target: number): number[][] {
  const sortedArray = [...inputArray].sort((valueA, valueB) => valueA - valueB); // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  const quadruplets: number[][] = []; // @step:initialize

  for (
    let firstIndex = 0;
    firstIndex < arrayLength - 3;
    firstIndex++ // @step:visit
  ) {
    if (firstIndex > 0 && sortedArray[firstIndex] === sortedArray[firstIndex - 1]) {
      // @step:compare
      continue; // @step:compare
    }

    for (
      let secondIndex = firstIndex + 1;
      secondIndex < arrayLength - 2;
      secondIndex++ // @step:visit
    ) {
      if (
        secondIndex > firstIndex + 1 &&
        sortedArray[secondIndex] === sortedArray[secondIndex - 1]
      ) {
        // @step:compare
        continue; // @step:compare
      }

      let leftPointer = secondIndex + 1; // @step:visit
      let rightPointer = arrayLength - 1; // @step:visit

      while (leftPointer < rightPointer) {
        // @step:compare
        const currentSum =
          sortedArray[firstIndex]! +
          sortedArray[secondIndex]! +
          sortedArray[leftPointer]! +
          sortedArray[rightPointer]!; // @step:compare

        if (currentSum === target) {
          // @step:compare
          quadruplets.push([
            sortedArray[firstIndex]!,
            sortedArray[secondIndex]!,
            sortedArray[leftPointer]!,
            sortedArray[rightPointer]!,
          ]); // @step:visit

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
        } else if (currentSum < target) {
          leftPointer++; // @step:visit
        } else {
          rightPointer--; // @step:visit
        }
      }
    }
  }

  return quadruplets; // @step:complete
}
