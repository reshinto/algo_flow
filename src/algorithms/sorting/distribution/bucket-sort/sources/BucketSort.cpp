// Bucket Sort — distribute elements into buckets, sort each bucket, then concatenate
#include <vector>
#include <algorithm>
#include <climits>

std::vector<int> bucketSort(std::vector<int> inputArray) {
    // @step:initialize
    if (inputArray.empty()) return {}; // @step:initialize
    std::vector<int> workingArray = inputArray; // @step:initialize
    int arrayLength = workingArray.size(); // @step:initialize

    int minValue = *std::min_element(workingArray.begin(), workingArray.end()); // @step:initialize
    int maxValue = *std::max_element(workingArray.begin(), workingArray.end()); // @step:initialize
    int bucketCount = std::max(1, arrayLength); // @step:initialize
    int valueRange = maxValue - minValue + 1; // @step:initialize

    // Create empty buckets
    std::vector<std::vector<int>> buckets(bucketCount); // @step:initialize

    // Distribute elements into buckets based on their normalized position
    for (int distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) {
        // @step:distribute
        int normalizedPosition = workingArray[distributeIndex] - minValue; // @step:distribute
        int bucketIndex = std::min(
            (int)((long long)normalizedPosition * bucketCount / valueRange),
            bucketCount - 1
        ); // @step:distribute
        buckets[bucketIndex].push_back(workingArray[distributeIndex]); // @step:distribute
    }

    // Sort each bucket using insertion sort
    for (int bucketIndex = 0; bucketIndex < bucketCount; bucketIndex++) {
        // @step:compare
        std::vector<int>& bucket = buckets[bucketIndex]; // @step:compare
        for (int outerIndex = 1; outerIndex < (int)bucket.size(); outerIndex++) {
            // @step:compare
            int currentValue = bucket[outerIndex]; // @step:compare
            int insertPosition = outerIndex - 1; // @step:compare
            while (insertPosition >= 0 && bucket[insertPosition] > currentValue) {
                // @step:swap
                bucket[insertPosition + 1] = bucket[insertPosition]; // @step:swap
                insertPosition--; // @step:swap
            }
            bucket[insertPosition + 1] = currentValue; // @step:swap
        }
    }

    // Collect all elements from sorted buckets
    int writeIndex = 0; // @step:collect
    for (int bucketIndex = 0; bucketIndex < bucketCount; bucketIndex++) {
        // @step:collect
        for (int bucketValue : buckets[bucketIndex]) {
            // @step:collect
            workingArray[writeIndex] = bucketValue; // @step:collect
            writeIndex++; // @step:collect
        }
    }

    // @step:mark-sorted
    return workingArray; // @step:complete
}
