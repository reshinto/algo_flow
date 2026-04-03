// Bucket Sort — distribute elements into buckets, sort each bucket, then concatenate
function bucketSort(inputArray: number[]): number[] {
  // @step:initialize
  if (inputArray.length === 0) return []; // @step:initialize
  const workingArray = [...inputArray]; // @step:initialize
  const arrayLength = workingArray.length; // @step:initialize

  const minValue = Math.min(...workingArray); // @step:initialize
  const maxValue = Math.max(...workingArray); // @step:initialize
  const bucketCount = Math.max(1, arrayLength); // @step:initialize
  const valueRange = maxValue - minValue + 1; // @step:initialize

  // Create empty buckets
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []); // @step:initialize

  // Distribute elements into buckets based on their normalized position
  for (let distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) {
    // @step:distribute
    const normalizedPosition = workingArray[distributeIndex]! - minValue; // @step:distribute
    const bucketIndex = Math.min(
      Math.floor((normalizedPosition / valueRange) * bucketCount),
      bucketCount - 1,
    ); // @step:distribute
    buckets[bucketIndex]!.push(workingArray[distributeIndex]!); // @step:distribute
  }

  // Sort each bucket using insertion sort
  for (let bucketIndex = 0; bucketIndex < bucketCount; bucketIndex++) {
    // @step:compare
    const bucket = buckets[bucketIndex]!; // @step:compare
    for (let outerIndex = 1; outerIndex < bucket.length; outerIndex++) {
      // @step:compare
      const currentValue = bucket[outerIndex]!; // @step:compare
      let insertPosition = outerIndex - 1; // @step:compare
      while (insertPosition >= 0 && bucket[insertPosition]! > currentValue) {
        // @step:swap
        bucket[insertPosition + 1] = bucket[insertPosition]!; // @step:swap
        insertPosition--; // @step:swap
      }
      bucket[insertPosition + 1] = currentValue; // @step:swap
    }
  }

  // Collect all elements from sorted buckets
  let writeIndex = 0; // @step:collect
  for (let bucketIndex = 0; bucketIndex < bucketCount; bucketIndex++) {
    // @step:collect
    for (const bucketValue of buckets[bucketIndex]!) {
      // @step:collect
      workingArray[writeIndex] = bucketValue; // @step:collect
      writeIndex++; // @step:collect
    }
  }

  // @step:mark-sorted
  return workingArray; // @step:complete
}
