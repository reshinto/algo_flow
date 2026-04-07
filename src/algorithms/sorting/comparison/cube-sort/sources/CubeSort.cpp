// Cube Sort — divide into cube-root-sized blocks, sort each, then merge all blocks together
#include <vector>
#include <cmath>
#include <climits>

std::vector<int> cubeSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) return sortedArray; // @step:initialize

    // Compute block size as cube root of array length (minimum 1)
    int blockSize = std::max(1, (int)std::ceil(std::cbrt(arrayLength))); // @step:initialize

    // Phase 1: Insertion sort each block
    int blockCount = (arrayLength + blockSize - 1) / blockSize;
    for (int blockIndex = 0; blockIndex < blockCount; blockIndex++) {
        // @step:divide-block
        int blockStart = blockIndex * blockSize; // @step:divide-block
        int blockEnd = std::min(blockStart + blockSize, arrayLength); // @step:divide-block

        // Insertion sort within this block
        for (int outerIndex = blockStart + 1; outerIndex < blockEnd; outerIndex++) {
            int currentValue = sortedArray[outerIndex]; // @step:compare
            int innerIndex = outerIndex - 1;

            while (innerIndex >= blockStart && sortedArray[innerIndex] > currentValue) {
                // @step:swap
                sortedArray[innerIndex + 1] = sortedArray[innerIndex]; // @step:swap
                innerIndex--;
            }
            sortedArray[innerIndex + 1] = currentValue; // @step:swap
        }
    }

    // Phase 2: Merge all sorted blocks using a k-way merge into a temporary array
    std::vector<int> resultArray(arrayLength);
    // Track the current position within each block
    std::vector<int> blockPointers(blockCount);
    for (int blockIndex = 0; blockIndex < blockCount; blockIndex++) {
        blockPointers[blockIndex] = blockIndex * blockSize;
    }

    for (int resultIndex = 0; resultIndex < arrayLength; resultIndex++) {
        // @step:merge-blocks
        int minimumValue = INT_MAX;
        int minimumBlock = -1;

        for (int blockIndex = 0; blockIndex < blockCount; blockIndex++) {
            int pointer = blockPointers[blockIndex];
            int blockEnd = std::min((blockIndex + 1) * blockSize, arrayLength);

            if (pointer < blockEnd) {
                // @step:compare
                if (sortedArray[pointer] < minimumValue) {
                    // @step:compare
                    minimumValue = sortedArray[pointer];
                    minimumBlock = blockIndex;
                }
            }
        }

        resultArray[resultIndex] = minimumValue; // @step:merge-blocks
        if (minimumBlock >= 0) blockPointers[minimumBlock]++; // @step:merge-blocks
    }

    // Copy result back
    for (int copyIndex = 0; copyIndex < arrayLength; copyIndex++) {
        sortedArray[copyIndex] = resultArray[copyIndex]; // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
