// Proxmap Sort — proximity map sorting: map each element to its approximate final position, then insertion sort locally
function proxmapSort(inputArray: number[]): number[] {
  // @step:initialize
  const sourceArray = [...inputArray]; // @step:initialize
  const arrayLength = sourceArray.length; // @step:initialize

  if (arrayLength <= 1) {
    return sourceArray; // @step:complete
  }

  const minValue = Math.min(...sourceArray); // @step:initialize
  const maxValue = Math.max(...sourceArray); // @step:initialize

  if (minValue === maxValue) {
    return sourceArray; // @step:complete
  }

  const valueRange = maxValue - minValue; // @step:initialize
  const scaleFactor = (arrayLength - 1) / valueRange; // @step:initialize

  // Build proxmap — count how many elements map to each position
  const hitCount = new Array<number>(arrayLength).fill(0); // @step:map-position
  for (let mapIndex = 0; mapIndex < arrayLength; mapIndex++) {
    // @step:map-position
    const mappedPosition = Math.floor(scaleFactor * (sourceArray[mapIndex]! - minValue)); // @step:map-position
    hitCount[mappedPosition]!++; // @step:map-position
  }

  // Compute starting positions for each cluster (prefix sums)
  const startPosition = new Array<number>(arrayLength).fill(0); // @step:map-position
  let runningTotal = 0; // @step:map-position
  for (let posIndex = 0; posIndex < arrayLength; posIndex++) {
    // @step:map-position
    startPosition[posIndex] = runningTotal; // @step:map-position
    runningTotal += hitCount[posIndex]!; // @step:map-position
  }

  // Insert each element into the output array near its mapped position
  const outputArray = new Array<number>(arrayLength).fill(0); // @step:compare
  const nextSlot = [...startPosition]; // @step:compare

  for (let insertIndex = 0; insertIndex < arrayLength; insertIndex++) {
    // @step:compare
    const currentValue = sourceArray[insertIndex]!; // @step:compare
    const mappedPosition = Math.floor(scaleFactor * (currentValue - minValue)); // @step:compare
    let slotIndex = nextSlot[mappedPosition]!; // @step:compare

    // Insertion sort within the cluster to maintain order
    while (
      slotIndex > startPosition[mappedPosition]! &&
      outputArray[slotIndex - 1]! > currentValue
    ) {
      // @step:compare
      outputArray[slotIndex] = outputArray[slotIndex - 1]!; // @step:swap
      slotIndex--; // @step:swap
    }
    outputArray[slotIndex] = currentValue; // @step:swap
    nextSlot[mappedPosition]!++; // @step:swap
  }

  // Copy sorted output back to source array
  for (let copyIndex = 0; copyIndex < arrayLength; copyIndex++) {
    sourceArray[copyIndex] = outputArray[copyIndex]!; // @step:mark-sorted
  }

  return sourceArray; // @step:complete
}
