// Heap Sort Visualization — sort using max-heap tree perspective: build heap, then extract max repeatedly
#include <vector>

void siftDown(std::vector<int>& arr, int heapSize, int parentIdx) {
    while (true) {
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        int largestIdx = parentIdx; // @step:sift-down
        if (leftIdx < heapSize && arr[leftIdx] > arr[largestIdx]) {
            // @step:compare
            largestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < heapSize && arr[rightIdx] > arr[largestIdx]) {
            // @step:compare
            largestIdx = rightIdx; // @step:sift-down
        }
        if (largestIdx == parentIdx) break; // @step:sift-down
        std::swap(arr[parentIdx], arr[largestIdx]); // @step:heap-swap
        parentIdx = largestIdx; // @step:sift-down
    }
}

std::vector<int> heapSortVisualization(std::vector<int> inputArray) {
    std::vector<int> array = inputArray; // @step:initialize
    int arrayLength = (int)array.size(); // @step:initialize

    // Phase 1: Build max-heap in-place
    int lastNonLeaf = arrayLength / 2 - 1;
    for (int nodeIdx = lastNonLeaf; nodeIdx >= 0; nodeIdx--) {
        siftDown(array, arrayLength, nodeIdx); // @step:sift-down
    }

    // Phase 2: Extract elements one by one
    for (int heapEnd = arrayLength - 1; heapEnd > 0; heapEnd--) {
        std::swap(array[0], array[heapEnd]); // @step:heap-swap
        siftDown(array, heapEnd, 0); // @step:sift-down
    }

    return array; // @step:complete
}
