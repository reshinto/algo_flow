function bubbleSort(inputArray: number[]): number[] {
  const sortedArray = [...inputArray];
  const arrayLength = sortedArray.length;

  for (let outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
    let swappedThisPass = false;

    for (let innerIndex = 0; innerIndex < arrayLength - 1 - outerIndex; innerIndex++) {
      if (sortedArray[innerIndex]! > sortedArray[innerIndex + 1]!) {
        const temporaryValue = sortedArray[innerIndex]!;
        sortedArray[innerIndex] = sortedArray[innerIndex + 1]!;
        sortedArray[innerIndex + 1] = temporaryValue;
        swappedThisPass = true;
      }
    }

    if (!swappedThisPass) break;
  }

  return sortedArray;
}
