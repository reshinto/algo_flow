// Heap Increase Key — increase the value at a given index in a min-heap, then sift-down
#include <vector>

void siftDown(std::vector<int>& array, int startIndex, int size) {
    int parentIndex = startIndex; // @step:sift-down
    while (true) {
        int smallestIndex = parentIndex; // @step:sift-down
        int leftIndex = 2 * parentIndex + 1; // @step:sift-down
        int rightIndex = 2 * parentIndex + 2; // @step:sift-down
        // Find the smallest among parent, left child, and right child
        if (leftIndex < size && array[leftIndex] < array[smallestIndex]) {
            // @step:compare
            smallestIndex = leftIndex; // @step:sift-down
        }
        if (rightIndex < size && array[rightIndex] < array[smallestIndex]) {
            // @step:compare
            smallestIndex = rightIndex; // @step:sift-down
        }
        if (smallestIndex == parentIndex) break; // @step:sift-down
        // Swap parent with smallest child — parent value is too large, push it down
        std::swap(array[parentIndex], array[smallestIndex]); // @step:heap-swap
        parentIndex = smallestIndex; // @step:sift-down
    }
}

std::vector<int> heapIncreaseKey(std::vector<int> inputArray, int targetIndex, int newValue) {
    std::vector<int> array = inputArray; // @step:initialize

    // Update the value at targetIndex to the new (larger) value
    array[targetIndex] = newValue; // @step:heap-update

    // Sift down to restore the min-heap property
    siftDown(array, targetIndex, (int)array.size()); // @step:sift-down

    return array; // @step:complete
}
