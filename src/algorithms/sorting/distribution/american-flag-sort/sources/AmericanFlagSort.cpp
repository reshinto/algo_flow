// American Flag Sort — in-place MSD radix sort: count digit frequencies, compute offsets, permute in-place
#include <vector>
#include <algorithm>

void americanFlagPass(std::vector<int>& arr, int start, int end, int divisor, int base) {
    if (end - start <= 1 || divisor < 1) return;

    // Count digit frequencies
    std::vector<int> counts(base, 0); // @step:count
    for (int countIndex = start; countIndex < end; countIndex++) {
        // @step:extract-digit,compare
        int digit = (arr[countIndex] / divisor) % base; // @step:extract-digit,compare
        counts[digit]++; // @step:count
    }

    // Compute bucket offsets (prefix sums)
    std::vector<int> offsets(base, 0); // @step:count
    offsets[0] = start; // @step:count
    for (int offsetIndex = 1; offsetIndex < base; offsetIndex++) {
        offsets[offsetIndex] = offsets[offsetIndex - 1] + counts[offsetIndex - 1]; // @step:count
    }

    // Track bucket boundaries for sub-range recursion
    std::vector<int> boundaries = offsets; // @step:count

    // Permute elements in-place into correct buckets
    for (int bucketDigit = 0; bucketDigit < base; bucketDigit++) {
        int bucketEnd = boundaries[bucketDigit] + counts[bucketDigit]; // @step:swap
        while (offsets[bucketDigit] < bucketEnd) {
            // @step:swap
            int currentPos = offsets[bucketDigit]; // @step:swap
            int digit = (arr[currentPos] / divisor) % base; // @step:extract-digit
            if (digit == bucketDigit) {
                offsets[bucketDigit]++; // @step:swap
            } else {
                int swapTarget = offsets[digit]; // @step:swap
                std::swap(arr[currentPos], arr[swapTarget]); // @step:swap
                offsets[digit]++; // @step:swap
            }
        }
    }

    // Recursively sort each bucket by the next digit
    if (divisor > 1) {
        int nextDivisor = divisor / base; // @step:mark-sorted
        for (int recursiveDigit = 0; recursiveDigit < base; recursiveDigit++) {
            if (counts[recursiveDigit] > 1) {
                americanFlagPass(
                    arr,
                    boundaries[recursiveDigit],
                    boundaries[recursiveDigit] + counts[recursiveDigit],
                    nextDivisor,
                    base
                ); // @step:mark-sorted
            }
        }
    }
}

std::vector<int> americanFlagSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) {
        return sortedArray; // @step:complete
    }

    // Shift all values to be non-negative
    int minValue = *std::min_element(sortedArray.begin(), sortedArray.end()); // @step:initialize
    int offset = minValue < 0 ? -minValue : 0; // @step:initialize
    for (int shiftIndex = 0; shiftIndex < arrayLength; shiftIndex++) {
        sortedArray[shiftIndex] += offset; // @step:initialize
    }

    int maxValue = *std::max_element(sortedArray.begin(), sortedArray.end()); // @step:initialize
    int digitBase = 10; // @step:initialize
    int digitDivisor = 1; // @step:initialize
    while (maxValue / digitDivisor >= digitBase) {
        digitDivisor *= digitBase; // @step:initialize
    }

    // Process MSD (most significant digit) first, recursively refine
    americanFlagPass(sortedArray, 0, arrayLength, digitDivisor, digitBase);

    // Shift values back
    for (int unshiftIndex = 0; unshiftIndex < arrayLength; unshiftIndex++) {
        sortedArray[unshiftIndex] -= offset; // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
