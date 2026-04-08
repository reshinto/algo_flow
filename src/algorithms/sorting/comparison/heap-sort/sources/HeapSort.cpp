// Heap Sort — build a max-heap, then repeatedly extract the maximum
#include <vector>

void siftDown(std::vector<int>& arr, int rootIndex, int heapSize) {
    // @step:compare
    int largestIndex = rootIndex; // @step:compare
    int leftChild = 2 * rootIndex + 1; // @step:compare
    int rightChild = 2 * rootIndex + 2; // @step:compare

    if (leftChild < heapSize && arr[leftChild] > arr[largestIndex]) {
        // @step:compare
        largestIndex = leftChild; // @step:compare
    }

    if (rightChild < heapSize && arr[rightChild] > arr[largestIndex]) {
        // @step:compare
        largestIndex = rightChild; // @step:compare
    }

    if (largestIndex != rootIndex) {
        // @step:swap
        int temporaryValue = arr[rootIndex]; // @step:swap
        arr[rootIndex] = arr[largestIndex]; // @step:swap
        arr[largestIndex] = temporaryValue; // @step:swap

        siftDown(arr, largestIndex, heapSize); // @step:swap
    }
}

std::vector<int> heapSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    // Phase 1: Build the max-heap by sifting down from the last internal node
    for (int buildIndex = arrayLength / 2 - 1; buildIndex >= 0; buildIndex--) {
        // @step:build-heap
        siftDown(sortedArray, buildIndex, arrayLength); // @step:build-heap
    }

    // Phase 2: Extract maximum elements one by one
    for (int extractIndex = arrayLength - 1; extractIndex > 0; extractIndex--) {
        // @step:extract
        int temporaryValue = sortedArray[0]; // @step:extract
        sortedArray[0] = sortedArray[extractIndex]; // @step:extract
        sortedArray[extractIndex] = temporaryValue; // @step:extract

        // Restore heap property after moving max to its sorted position
        siftDown(sortedArray, 0, extractIndex); // @step:compare

        // The element at extractIndex is now permanently sorted
        // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
