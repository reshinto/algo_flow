// Heap Extract Min — remove and return the minimum (root) from a min-heap, then restore heap property
#include <vector>
#include <utility>

std::pair<int, std::vector<int>> heapExtractMin(std::vector<int> heapArray) {
    std::vector<int> array = heapArray; // @step:initialize
    int extractedValue = array[0]; // @step:heap-extract
    int lastIdx = (int)array.size() - 1; // @step:heap-extract
    // Move last element to root and remove the last position
    std::swap(array[0], array[lastIdx]); // @step:heap-swap
    array.pop_back(); // @step:heap-extract
    // Sift down the new root to restore heap property
    int size = (int)array.size();
    int parentIdx = 0; // @step:sift-down
    while (true) {
        // @step:sift-down
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
        // Swap parent with smallest child
        std::swap(array[parentIdx], array[smallestIdx]); // @step:heap-swap
        parentIdx = smallestIdx; // @step:sift-down
    }
    return {extractedValue, array}; // @step:complete
}
