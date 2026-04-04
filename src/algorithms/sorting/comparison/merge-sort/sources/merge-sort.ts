// Merge Sort — divide array in half recursively, then merge sorted halves
function mergeSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  function mergeSortRecursive(arr: number[], leftStart: number, rightEnd: number): void {
    // @step:divide
    if (rightEnd - leftStart <= 1) return; // @step:divide

    const midPoint = Math.floor((leftStart + rightEnd) / 2); // @step:divide

    mergeSortRecursive(arr, leftStart, midPoint); // @step:divide
    mergeSortRecursive(arr, midPoint, rightEnd); // @step:divide

    // Merge the two sorted halves
    const leftHalf = arr.slice(leftStart, midPoint); // @step:merge
    const rightHalf = arr.slice(midPoint, rightEnd); // @step:merge

    let leftIndex = 0; // @step:merge
    let rightIndex = 0; // @step:merge
    let mergePosition = leftStart; // @step:merge

    while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
      // @step:compare
      if (leftHalf[leftIndex]! <= rightHalf[rightIndex]!) {
        // @step:compare
        arr[mergePosition] = leftHalf[leftIndex]!; // @step:swap
        leftIndex++; // @step:swap
      } else {
        arr[mergePosition] = rightHalf[rightIndex]!; // @step:swap
        rightIndex++; // @step:swap
      }
      mergePosition++; // @step:swap
    }

    while (leftIndex < leftHalf.length) {
      // @step:merge
      arr[mergePosition] = leftHalf[leftIndex]!; // @step:merge
      leftIndex++; // @step:merge
      mergePosition++; // @step:merge
    }

    while (rightIndex < rightHalf.length) {
      // @step:merge
      arr[mergePosition] = rightHalf[rightIndex]!; // @step:merge
      rightIndex++; // @step:merge
      mergePosition++; // @step:merge
    }
  }

  mergeSortRecursive(sortedArray, 0, arrayLength); // @step:divide

  return sortedArray; // @step:complete
}
