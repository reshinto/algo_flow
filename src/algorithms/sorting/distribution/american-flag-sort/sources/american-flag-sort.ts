// American Flag Sort — in-place MSD radix sort: count digit frequencies, compute offsets, permute in-place
function americanFlagSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) {
    return sortedArray; // @step:complete
  }

  // Shift all values to be non-negative
  const minValue = Math.min(...sortedArray); // @step:initialize
  const offset = minValue < 0 ? -minValue : 0; // @step:initialize
  for (let shiftIndex = 0; shiftIndex < arrayLength; shiftIndex++) {
    sortedArray[shiftIndex] = sortedArray[shiftIndex]! + offset; // @step:initialize
  }

  const maxValue = Math.max(...sortedArray); // @step:initialize
  const digitBase = 10; // @step:initialize
  let digitDivisor = 1; // @step:initialize
  while (Math.floor(maxValue / digitDivisor) >= digitBase) {
    digitDivisor *= digitBase; // @step:initialize
  }

  // Process MSD (most significant digit) first, recursively refine
  americanFlagPass(sortedArray, 0, arrayLength, digitDivisor, digitBase);

  // Shift values back
  for (let unshiftIndex = 0; unshiftIndex < arrayLength; unshiftIndex++) {
    sortedArray[unshiftIndex] = sortedArray[unshiftIndex]! - offset; // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}

function americanFlagPass(
  arr: number[],
  start: number,
  end: number,
  divisor: number,
  base: number,
): void {
  if (end - start <= 1 || divisor < 1) return;

  // Count digit frequencies
  const counts = new Array<number>(base).fill(0); // @step:count
  for (let countIndex = start; countIndex < end; countIndex++) {
    // @step:extract-digit,compare
    const digit = Math.floor(arr[countIndex]! / divisor) % base; // @step:extract-digit,compare
    counts[digit]!++; // @step:count
  }

  // Compute bucket offsets (prefix sums)
  const offsets = new Array<number>(base).fill(0); // @step:count
  offsets[0] = start; // @step:count
  for (let offsetIndex = 1; offsetIndex < base; offsetIndex++) {
    offsets[offsetIndex] = offsets[offsetIndex - 1]! + counts[offsetIndex - 1]!; // @step:count
  }

  // Track bucket boundaries for sub-range recursion
  const boundaries = [...offsets]; // @step:count

  // Permute elements in-place into correct buckets
  for (let bucketDigit = 0; bucketDigit < base; bucketDigit++) {
    const bucketEnd = boundaries[bucketDigit]! + counts[bucketDigit]!; // @step:swap
    while (offsets[bucketDigit]! < bucketEnd) {
      // @step:swap
      const currentPos = offsets[bucketDigit]!; // @step:swap
      const digit = Math.floor(arr[currentPos]! / divisor) % base; // @step:extract-digit
      if (digit === bucketDigit) {
        offsets[bucketDigit]!++; // @step:swap
      } else {
        const swapTarget = offsets[digit]!; // @step:swap
        const temporary = arr[currentPos]!; // @step:swap
        arr[currentPos] = arr[swapTarget]!; // @step:swap
        arr[swapTarget] = temporary; // @step:swap
        offsets[digit]!++; // @step:swap
      }
    }
  }

  // Recursively sort each bucket by the next digit
  if (divisor > 1) {
    const nextDivisor = Math.floor(divisor / base); // @step:mark-sorted
    for (let recursiveDigit = 0; recursiveDigit < base; recursiveDigit++) {
      if (counts[recursiveDigit]! > 1) {
        americanFlagPass(
          arr,
          boundaries[recursiveDigit]!,
          boundaries[recursiveDigit]! + counts[recursiveDigit]!,
          nextDivisor,
          base,
        ); // @step:mark-sorted
      }
    }
  }
}
