// Gnome Sort — move forward if in order, backward (swapping) if not
function gnomeSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize
  let position = 0; // @step:initialize

  while (position < arrayLength) {
    if (position === 0) {
      // @step:move-forward
      position++; // @step:move-forward
    } else {
      // @step:compare
      if (sortedArray[position]! >= sortedArray[position - 1]!) {
        // Elements are in order — move forward
        // @step:move-forward
        position++; // @step:move-forward
      } else {
        // Elements are out of order — swap and step back
        // @step:swap
        const temporaryValue = sortedArray[position]!; // @step:swap
        sortedArray[position] = sortedArray[position - 1]!; // @step:swap
        sortedArray[position - 1] = temporaryValue; // @step:swap
        position--; // @step:swap
      }
    }
  }

  // All elements are in their sorted positions
  // @step:mark-sorted

  return sortedArray; // @step:complete
}
