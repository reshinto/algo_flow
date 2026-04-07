// Heap Extract Max — remove and return the maximum (root) from a max-heap, then restore heap property
#include <vector>
#include <utility>

std::pair<int, std::vector<int>> heapExtractMax(std::vector<int> heapArray) {
    std::vector<int> array = heapArray; // @step:initialize
    int extractedValue = array[0]; // @step:heap-extract
    int lastIdx = (int)array.size() - 1; // @step:heap-extract
    // Move last element to root and remove the last position
    std::swap(array[0], array[lastIdx]); // @step:heap-swap
    array.pop_back(); // @step:heap-extract
    // Sift down the new root to restore max-heap property
    int size = (int)array.size();
    int parentIdx = 0; // @step:sift-down
    while (true) {
        // @step:sift-down
        int largestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        // Find the largest among parent, left child, and right child
        if (leftIdx < size && array[leftIdx] > array[largestIdx]) {
            // @step:sift-down
            largestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < size && array[rightIdx] > array[largestIdx]) {
            // @step:sift-down
            largestIdx = rightIdx; // @step:sift-down
        }
        if (largestIdx == parentIdx) break; // @step:sift-down
        // Swap parent with largest child
        std::swap(array[parentIdx], array[largestIdx]); // @step:heap-swap
        parentIdx = largestIdx; // @step:sift-down
    }
    return {extractedValue, array}; // @step:complete
}
