function binarySearch(sortedArray: number[], targetValue: number): number {
  let lowIndex = 0;
  let highIndex = sortedArray.length - 1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((lowIndex + highIndex) / 2);
    const midValue = sortedArray[midIndex]!;

    if (midValue === targetValue) {
      return midIndex;
    } else if (midValue < targetValue) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }

  return -1;
}
