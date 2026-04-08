// Heapify Single Node — demonstrate sift-down on a single subtree root to its correct position
#include <vector>

void siftDown(std::vector<int>& array, int startIdx, int size) {
    int parentIdx = startIdx; // @step:sift-down
    while (true) {
        int smallestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        // Find the smallest among parent, left child, and right child
        if (leftIdx < size && array[leftIdx] < array[smallestIdx]) {
            // @step:sift-down
            smallestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < size && array[rightIdx] < array[smallestIdx]) {
            // @step:sift-down
            smallestIdx = rightIdx; // @step:sift-down
        }
        if (smallestIdx == parentIdx) break; // @step:sift-down
        // Swap parent with the smallest child
        std::swap(array[parentIdx], array[smallestIdx]); // @step:heap-swap
        parentIdx = smallestIdx; // @step:sift-down
    }
}

std::vector<int> heapifySingleNode(std::vector<int> inputArray, int targetIndex) {
    std::vector<int> array = inputArray; // @step:initialize
    int size = (int)array.size(); // @step:initialize
    siftDown(array, targetIndex, size); // @step:sift-down
    return array; // @step:complete
}
