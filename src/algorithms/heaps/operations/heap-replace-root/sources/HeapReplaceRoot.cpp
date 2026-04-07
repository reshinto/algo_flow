// Heap Replace Root — replace the root with a new value and sift-down (more efficient than extract+insert)
#include <vector>
#include <utility>

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
        // Swap parent with smallest child
        std::swap(array[parentIndex], array[smallestIndex]); // @step:heap-swap
        parentIndex = smallestIndex; // @step:sift-down
    }
}

std::pair<int, std::vector<int>> heapReplaceRoot(std::vector<int> inputArray, int newValue) {
    std::vector<int> array = inputArray; // @step:initialize
    int replacedValue = array[0]; // @step:initialize

    // Place the new value at the root
    array[0] = newValue; // @step:heap-update

    // Sift down to restore the min-heap property
    siftDown(array, 0, (int)array.size()); // @step:sift-down

    return {replacedValue, array}; // @step:complete
}
