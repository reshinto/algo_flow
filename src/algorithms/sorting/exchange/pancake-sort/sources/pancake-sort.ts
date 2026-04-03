// Pancake Sort — find max in unsorted portion, flip to front, flip to end
// A flip reverses the subarray from index 0 to flipIndex (inclusive) via adjacent swaps
function pancakeSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  for (let unsortedSize = arrayLength; unsortedSize > 1; unsortedSize--) {
    // Find the index of the maximum element in the unsorted portion
    // @step:find-max
    let maxIndex = 0; // @step:find-max
    for (let searchIndex = 1; searchIndex < unsortedSize; searchIndex++) {
      // @step:compare
      if (sortedArray[searchIndex]! > sortedArray[maxIndex]!) {
        maxIndex = searchIndex; // @step:compare
      }
    }

    // If the max is not already at the end, flip it there
    if (maxIndex !== unsortedSize - 1) {
      // Flip max to front if not already there
      if (maxIndex !== 0) {
        // @step:flip
        let flipLeft = 0; // @step:flip
        let flipRight = maxIndex; // @step:flip
        while (flipLeft < flipRight) {
          // @step:swap
          const temporaryValue = sortedArray[flipLeft]!; // @step:swap
          sortedArray[flipLeft] = sortedArray[flipRight]!; // @step:swap
          sortedArray[flipRight] = temporaryValue; // @step:swap
          flipLeft++;
          flipRight--;
        }
      }

      // Flip front to end of unsorted portion
      // @step:flip
      let flipLeft = 0; // @step:flip
      let flipRight = unsortedSize - 1; // @step:flip
      while (flipLeft < flipRight) {
        // @step:swap
        const temporaryValue = sortedArray[flipLeft]!; // @step:swap
        sortedArray[flipLeft] = sortedArray[flipRight]!; // @step:swap
        sortedArray[flipRight] = temporaryValue; // @step:swap
        flipLeft++;
        flipRight--;
      }
    }

    // The element at unsortedSize - 1 is now in its sorted position
    // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
