// Odd-Even Merge Sort — Batcher's odd-even transposition sort (correct for all sizes)
#include <vector>
#include <algorithm>
#include <cmath>

std::vector<int> oddEvenMergeSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) {
        return sortedArray; // @step:complete
    }

    // Batcher's odd-even transposition sort:
    // Alternates between odd-phase and even-phase compare-swap passes
    // Requires ceil(n/2) * 2 rounds to sort n elements
    int totalRounds = (int)std::ceil(arrayLength / 2.0) * 2; // @step:merge

    for (int roundIndex = 0; roundIndex < totalRounds; roundIndex++) {
        // @step:compare
        bool isOddRound = roundIndex % 2 == 0; // @step:compare
        int startIndex = isOddRound ? 0 : 1; // @step:compare

        for (int leftIndex = startIndex; leftIndex + 1 < arrayLength; leftIndex += 2) {
            // @step:compare
            if (sortedArray[leftIndex] > sortedArray[leftIndex + 1]) {
                // @step:swap
                std::swap(sortedArray[leftIndex], sortedArray[leftIndex + 1]); // @step:swap
            }
        }
    }

    // @step:mark-sorted

    return sortedArray; // @step:complete
}
