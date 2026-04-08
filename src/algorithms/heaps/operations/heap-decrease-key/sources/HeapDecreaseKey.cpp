// Heap Decrease Key — decrease the value at a given index in a min-heap, then sift-up
#include <vector>

void siftUp(std::vector<int>& array, int startIndex) {
    int currentIndex = startIndex; // @step:sift-up
    while (currentIndex > 0) {
        int parentIndex = (currentIndex - 1) / 2; // @step:sift-up
        if (array[currentIndex] >= array[parentIndex]) break; // @step:compare
        // Swap current with parent — current value is smaller, move it up
        std::swap(array[currentIndex], array[parentIndex]); // @step:heap-swap
        currentIndex = parentIndex; // @step:sift-up
    }
}

std::vector<int> heapDecreaseKey(std::vector<int> inputArray, int targetIndex, int newValue) {
    std::vector<int> array = inputArray; // @step:initialize

    // Update the value at targetIndex to the new (smaller) value
    array[targetIndex] = newValue; // @step:heap-update

    // Sift up to restore the min-heap property
    siftUp(array, targetIndex); // @step:sift-up

    return array; // @step:complete
}
