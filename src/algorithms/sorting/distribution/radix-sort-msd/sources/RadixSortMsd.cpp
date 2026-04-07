// Radix Sort MSD — sort integers digit by digit from most to least significant (recursive)
#include <vector>
#include <algorithm>

std::vector<int> sortByDigit(std::vector<int> subArray, int digitDivisor, int base) {
    // @step:extract-digit
    if (subArray.size() <= 1 || digitDivisor < 1) return subArray; // @step:extract-digit

    std::vector<std::vector<int>> buckets(base); // @step:extract-digit

    for (int value : subArray) {
        // @step:extract-digit,compare
        int digit = (value / digitDivisor) % base; // @step:extract-digit,compare
        buckets[digit].push_back(value); // @step:extract-digit
    }

    std::vector<int> result; // @step:place
    for (int bucketIndex = 0; bucketIndex < base; bucketIndex++) {
        // @step:place
        std::vector<int> sortedBucket = sortByDigit(buckets[bucketIndex], digitDivisor / base, base); // @step:place
        for (int bucketValue : sortedBucket) {
            // @step:place
            result.push_back(bucketValue); // @step:place
        }
    }

    return result; // @step:place
}

std::vector<int> radixSortMsd(std::vector<int> inputArray) {
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
    const int base = 10; // @step:initialize

    // Determine the highest digit position
    int maxDivisor = 1; // @step:initialize
    while (maxDivisor * base <= maxValue) {
        // @step:initialize
        maxDivisor *= base; // @step:initialize
    }

    std::vector<int> sorted = sortByDigit(workingArray, maxDivisor, base);

    // Restore offset
    for (int restoreIndex = 0; restoreIndex < arrayLength; restoreIndex++) {
        // @step:mark-sorted
        sorted[restoreIndex] -= offset; // @step:mark-sorted
    }

    return sorted; // @step:complete
}
