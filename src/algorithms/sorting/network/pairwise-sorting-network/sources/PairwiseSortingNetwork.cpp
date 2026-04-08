// Pairwise Sorting Network — sort adjacent pairs first, then merge via compare-swap with doubling strides
#include <vector>
#include <algorithm>

void compareAndSwap(std::vector<int>& sortedArray, int firstIndex, int secondIndex) {
    int arrayLength = sortedArray.size();
    if (firstIndex < arrayLength && secondIndex < arrayLength) {
        if (sortedArray[firstIndex] > sortedArray[secondIndex]) {
            // @step:swap
            std::swap(sortedArray[firstIndex], sortedArray[secondIndex]); // @step:swap
        }
    }
}

std::vector<int> pairwiseSortingNetwork(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) {
        return sortedArray; // @step:complete
    }

    // Phase 1: Sort adjacent pairs
    for (int pairStart = 0; pairStart + 1 < arrayLength; pairStart += 2) {
        // @step:compare
        compareAndSwap(sortedArray, pairStart, pairStart + 1); // @step:compare
    }

    // Phase 2: Merge using Shell-sort-like gap sequence (powers of 2, decreasing)
    for (int gap = 2; gap < arrayLength; gap *= 2) {
        // @step:compare
        // Compare elements at distance gap within each merged block
        for (int blockStart = 0; blockStart < arrayLength; blockStart += gap * 2) {
            // @step:compare
            for (int offset = 0; offset < gap && blockStart + offset + gap < arrayLength; offset++) {
                // @step:compare
                compareAndSwap(sortedArray, blockStart + offset, blockStart + offset + gap); // @step:compare
            }
        }
        // Reconciliation: fix local inversions created by the block merge
        for (int reconcileGap = gap / 2; reconcileGap >= 1; reconcileGap /= 2) {
            // @step:compare
            for (int reconcileStart = reconcileGap;
                 reconcileStart + reconcileGap < arrayLength;
                 reconcileStart += reconcileGap * 2) {
                // @step:compare
                for (int reconcileOffset = 0;
                     reconcileOffset < reconcileGap && reconcileStart + reconcileOffset < arrayLength - 1;
                     reconcileOffset++) {
                    // @step:compare
                    compareAndSwap(sortedArray, reconcileStart + reconcileOffset,
                                   reconcileStart + reconcileOffset + 1); // @step:compare
                }
            }
        }
    }

    // Final pass to ensure complete sortedness (odd-even transposition pass)
    bool swapped = true;
    while (swapped) {
        swapped = false;
        for (int finalIndex = 0; finalIndex + 1 < arrayLength; finalIndex++) {
            if (sortedArray[finalIndex] > sortedArray[finalIndex + 1]) {
                compareAndSwap(sortedArray, finalIndex, finalIndex + 1);
                swapped = true;
            }
        }
    }

    // @step:mark-sorted

    return sortedArray; // @step:complete
}
