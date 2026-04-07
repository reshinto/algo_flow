// Bitonic Sort — build a bitonic sequence then merge to sort; works best on power-of-2 sizes
#include <vector>
#include <algorithm>
#include <climits>

std::vector<int> bitonicSort(std::vector<int> inputArray) {
    // @step:initialize
    int arrayLength = inputArray.size(); // @step:initialize
    if (arrayLength <= 1) return inputArray; // @step:initialize

    // Pad to the next power of 2 with INT_MAX so real elements always sort first
    int paddedLength = 1; // @step:initialize
    while (paddedLength < arrayLength) paddedLength <<= 1; // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    while ((int)sortedArray.size() < paddedLength) sortedArray.push_back(INT_MAX); // @step:initialize

    // Bitonic sort network: outer stage controls the sub-sequence size
    for (int stage = 2; stage <= paddedLength; stage <<= 1) {
        // Each stage doubles the size of sorted bitonic sequences
        for (int step = stage >> 1; step > 0; step >>= 1) {
            // @step:compare
            for (int elementIndex = 0; elementIndex < paddedLength; elementIndex++) {
                int partnerIndex = elementIndex ^ step; // @step:compare

                if (partnerIndex > elementIndex) {
                    // @step:compare
                    bool isAscending = (elementIndex & stage) == 0; // @step:compare

                    if (isAscending && sortedArray[elementIndex] > sortedArray[partnerIndex]) {
                        // @step:swap
                        std::swap(sortedArray[elementIndex], sortedArray[partnerIndex]); // @step:swap
                    } else if (!isAscending && sortedArray[elementIndex] < sortedArray[partnerIndex]) {
                        // @step:swap
                        std::swap(sortedArray[elementIndex], sortedArray[partnerIndex]); // @step:swap
                    }
                }
            }
        }
    }

    // @step:mark-sorted
    sortedArray.resize(arrayLength);
    return sortedArray; // @step:complete
}
