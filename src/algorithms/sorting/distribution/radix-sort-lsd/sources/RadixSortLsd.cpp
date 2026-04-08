// Radix Sort LSD — sort integers digit by digit from least to most significant
#include <vector>
#include <algorithm>

std::vector<int> radixSortLsd(std::vector<int> inputArray) {
    // @step:initialize
    if (inputArray.empty()) return {}; // @step:initialize
    std::vector<int> workingArray = inputArray; // @step:initialize
    int arrayLength = workingArray.size(); // @step:initialize

    // Offset negatives so all values are non-negative
    int minValue = *std::min_element(workingArray.begin(), workingArray.end()); // @step:initialize
    int offset = minValue < 0 ? -minValue : 0; // @step:initialize
    for (int offsetIndex = 0; offsetIndex < arrayLength; offsetIndex++) {
        // @step:initialize
        workingArray[offsetIndex] += offset; // @step:initialize
    }

    int maxValue = *std::max_element(workingArray.begin(), workingArray.end()); // @step:initialize

    // Process each digit position from least significant to most significant
    int digitDivisor = 1; // @step:initialize
    while (maxValue / digitDivisor > 0) {
        // @step:extract-digit
        const int base = 10; // @step:extract-digit
        std::vector<std::vector<int>> buckets(base); // @step:extract-digit

        // Distribute elements into buckets based on current digit
        for (int distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) {
            // @step:extract-digit,compare
            int digit = (workingArray[distributeIndex] / digitDivisor) % base; // @step:extract-digit,compare
            buckets[digit].push_back(workingArray[distributeIndex]); // @step:extract-digit
        }

        // Collect elements back from buckets in order
        int writeIndex = 0; // @step:place
        for (int bucketIndex = 0; bucketIndex < base; bucketIndex++) {
            // @step:place
            for (int bucketValue : buckets[bucketIndex]) {
                // @step:place
                workingArray[writeIndex] = bucketValue; // @step:place
                writeIndex++; // @step:place
            }
        }

        digitDivisor *= base; // @step:place
    }

    // Reverse the offset to restore original value range
    for (int restoreIndex = 0; restoreIndex < arrayLength; restoreIndex++) {
        // @step:mark-sorted
        workingArray[restoreIndex] -= offset; // @step:mark-sorted
    }

    return workingArray; // @step:complete
}
