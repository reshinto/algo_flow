// Sleep Sort — simulated: each element's "delay" is its value, smaller values wake up first
function sleepSort(inputArray: number[]): number[] {
  // @step:initialize
  const originalArray = [...inputArray]; // @step:initialize
  const arrayLength = originalArray.length; // @step:initialize

  // Simulate scheduling: sort elements by value (ascending delay order)
  // In real sleep sort, each element schedules itself with setTimeout(value)
  // and outputs when its timer fires; smaller values fire first
  const scheduledElements = [...originalArray].sort(
    (firstValue, secondValue) => firstValue - secondValue,
  ); // @step:schedule

  const outputArray: number[] = []; // @step:schedule

  // Elements "wake up" in order of their value (their simulated delay)
  for (let wakeIndex = 0; wakeIndex < arrayLength; wakeIndex++) {
    // @step:wake-up
    const wakingValue = scheduledElements[wakeIndex]!; // @step:wake-up

    // Compare with next sleeping element to show scheduling relationship
    if (wakeIndex + 1 < arrayLength) {
      // @step:compare
      const _ = scheduledElements[wakeIndex + 1]; // @step:compare — next element still sleeping
      void _; // suppress unused variable warning
    }

    outputArray.push(wakingValue); // @step:swap
    // @step:mark-sorted
  }

  return outputArray; // @step:complete
}
