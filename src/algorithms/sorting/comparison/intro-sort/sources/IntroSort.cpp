// Intro Sort — starts with Quick Sort, falls back to Heap Sort when depth limit exceeded,
// uses Insertion Sort for small partitions
#include <vector>
#include <cmath>

const int INSERTION_SORT_THRESHOLD = 16;

void insertionSortSlice(std::vector<int>& sortedArray, int sliceStart, int sliceEnd) {
    // @step:insertion-pass
    for (int outerIndex = sliceStart + 1; outerIndex <= sliceEnd; outerIndex++) {
        // @step:insertion-pass
        int currentValue = sortedArray[outerIndex]; // @step:insertion-pass
        int innerIndex = outerIndex - 1; // @step:insertion-pass

        while (innerIndex >= sliceStart && sortedArray[innerIndex] > currentValue) {
            // @step:compare
            sortedArray[innerIndex + 1] = sortedArray[innerIndex]; // @step:swap
            innerIndex--; // @step:swap
        }
        sortedArray[innerIndex + 1] = currentValue; // @step:swap
    }
}

void heapify(std::vector<int>& sortedArray, int heapSize, int rootIndex) {
    // @step:heapify
    int largestIndex = rootIndex; // @step:heapify
    int leftChild = 2 * rootIndex + 1; // @step:heapify
    int rightChild = 2 * rootIndex + 2; // @step:heapify

    if (leftChild < heapSize && sortedArray[leftChild] > sortedArray[largestIndex]) {
        // @step:compare
        largestIndex = leftChild; // @step:heapify
    }
    if (rightChild < heapSize && sortedArray[rightChild] > sortedArray[largestIndex]) {
        // @step:compare
        largestIndex = rightChild; // @step:heapify
    }

    if (largestIndex != rootIndex) {
        // @step:swap
        int temporaryValue = sortedArray[rootIndex]; // @step:swap
        sortedArray[rootIndex] = sortedArray[largestIndex]; // @step:swap
        sortedArray[largestIndex] = temporaryValue; // @step:swap
        heapify(sortedArray, heapSize, largestIndex); // @step:heapify
    }
}

void heapSortSlice(std::vector<int>& sortedArray, int sliceStart, int sliceEnd) {
    // @step:heapify
    int sliceLength = sliceEnd - sliceStart + 1; // @step:heapify

    // Build max heap over the slice
    for (int buildIndex = sliceLength / 2 - 1; buildIndex >= 0; buildIndex--) {
        // @step:heapify
        heapify(sortedArray, sliceLength, buildIndex); // @step:heapify
    }

    // Extract elements one by one
    for (int extractIndex = sliceLength - 1; extractIndex > 0; extractIndex--) {
        // @step:swap
        int temporaryValue = sortedArray[sliceStart]; // @step:swap
        sortedArray[sliceStart] = sortedArray[sliceStart + extractIndex]; // @step:swap
        sortedArray[sliceStart + extractIndex] = temporaryValue; // @step:swap
        heapify(sortedArray, extractIndex, 0); // @step:heapify
    }
}

int lomutoPartition(std::vector<int>& sortedArray, int partitionStart, int partitionEnd) {
    // @step:partition
    int pivotValue = sortedArray[partitionEnd]; // @step:partition
    int partitionIndex = partitionStart - 1; // @step:partition

    for (int scanIndex = partitionStart; scanIndex < partitionEnd; scanIndex++) {
        // @step:compare
        if (sortedArray[scanIndex] <= pivotValue) {
            // @step:compare
            partitionIndex++; // @step:swap
            int temporaryValue = sortedArray[partitionIndex]; // @step:swap
            sortedArray[partitionIndex] = sortedArray[scanIndex]; // @step:swap
            sortedArray[scanIndex] = temporaryValue; // @step:swap
        }
    }

    int temporaryValue = sortedArray[partitionIndex + 1]; // @step:swap
    sortedArray[partitionIndex + 1] = sortedArray[partitionEnd]; // @step:swap
    sortedArray[partitionEnd] = temporaryValue; // @step:swap
    return partitionIndex + 1; // @step:partition
}

void introSortRecurse(std::vector<int>& sortedArray, int rangeStart, int rangeEnd, int depthLimit) {
    int rangeSize = rangeEnd - rangeStart + 1;

    if (rangeSize <= INSERTION_SORT_THRESHOLD) {
        // @step:insertion-pass
        insertionSortSlice(sortedArray, rangeStart, rangeEnd); // @step:insertion-pass
        return;
    }

    if (depthLimit == 0) {
        // @step:heapify
        heapSortSlice(sortedArray, rangeStart, rangeEnd); // @step:heapify
        return;
    }

    int pivotIndex = lomutoPartition(sortedArray, rangeStart, rangeEnd); // @step:partition
    introSortRecurse(sortedArray, rangeStart, pivotIndex - 1, depthLimit - 1); // @step:partition
    introSortRecurse(sortedArray, pivotIndex + 1, rangeEnd, depthLimit - 1); // @step:partition
}

std::vector<int> introSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) {
        return sortedArray; // @step:complete
    }

    int depthLimit = 2 * (int)std::log2(arrayLength); // @step:initialize
    introSortRecurse(sortedArray, 0, arrayLength - 1, depthLimit); // @step:partition

    // @step:mark-sorted
    return sortedArray; // @step:complete
}
