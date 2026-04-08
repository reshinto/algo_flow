// Heap Delete Arbitrary — remove a node at any index from a min-heap in O(log n)
#include <vector>

void siftUp(std::vector<int>& array, int startIndex) {
    int currentIndex = startIndex; // @step:sift-up
    while (currentIndex > 0) {
        int parentIndex = (currentIndex - 1) / 2; // @step:sift-up
        if (array[currentIndex] >= array[parentIndex]) break; // @step:compare
        // Swap current with parent
        std::swap(array[currentIndex], array[parentIndex]); // @step:heap-swap
        currentIndex = parentIndex; // @step:sift-up
    }
}

void siftDown(std::vector<int>& array, int startIndex, int size) {
    int parentIndex = startIndex; // @step:sift-down
    while (true) {
        int smallestIndex = parentIndex; // @step:sift-down
        int leftIndex = 2 * parentIndex + 1; // @step:sift-down
        int rightIndex = 2 * parentIndex + 2; // @step:sift-down
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

std::vector<int> heapDeleteArbitrary(std::vector<int> inputArray, int targetIndex) {
    std::vector<int> array = inputArray; // @step:initialize
    int lastIndex = (int)array.size() - 1; // @step:initialize

    // Replace target with the last element, then shrink the heap
    array[targetIndex] = array[lastIndex]; // @step:heap-extract
    array.pop_back(); // @step:heap-extract

    if (targetIndex >= (int)array.size()) return array; // @step:complete

    int parentIndex = (targetIndex > 0) ? (targetIndex - 1) / 2 : 0; // @step:sift-up

    // If new value is smaller than its parent, sift up; otherwise sift down
    if (targetIndex > 0 && array[targetIndex] < array[parentIndex]) {
        // @step:sift-up
        siftUp(array, targetIndex); // @step:sift-up
    } else {
        siftDown(array, targetIndex, (int)array.size()); // @step:sift-down
    }

    return array; // @step:complete
}
