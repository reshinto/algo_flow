// Bitonic Sort Network — fixed compare-swap network for power-of-2 sizes
#include <vector>
#include <algorithm>
#include <climits>

std::vector<int> bitonicSortNetwork(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int originalLength = sortedArray.size(); // @step:initialize

    // Pad to next power of 2 with large sentinel values
    int paddedLength = 1; // @step:initialize
    while (paddedLength < originalLength) {
        // @step:initialize
        paddedLength *= 2; // @step:initialize
    }
    while ((int)sortedArray.size() < paddedLength) {
        // @step:initialize
        sortedArray.push_back(INT_MAX); // @step:initialize
    }

    // Bitonic sort network: log2(n) stages, each with sub-stages of compare-swap pairs
    for (int stageSize = 2; stageSize <= paddedLength; stageSize *= 2) {
        // @step:compare
        for (int subSize = stageSize; subSize >= 2; subSize = subSize / 2) {
            // @step:compare
            int halfSubSize = subSize / 2; // @step:compare
            for (int elementIndex = 0; elementIndex < paddedLength; elementIndex++) {
                // @step:compare
                int partnerIndex = elementIndex ^ halfSubSize; // @step:compare
                if (partnerIndex > elementIndex) {
                    // @step:compare
                    bool ascending = (elementIndex & stageSize) == 0; // @step:compare
                    if ((ascending && sortedArray[elementIndex] > sortedArray[partnerIndex]) ||
                        (!ascending && sortedArray[elementIndex] < sortedArray[partnerIndex])) {
                        // @step:swap
                        std::swap(sortedArray[elementIndex], sortedArray[partnerIndex]); // @step:swap
                    }
                }
            }
        }
    }

    // Remove padding sentinels
    // @step:mark-sorted
    sortedArray.resize(originalLength);
    std::vector<int> result = sortedArray; // @step:mark-sorted

    return result; // @step:complete
}
