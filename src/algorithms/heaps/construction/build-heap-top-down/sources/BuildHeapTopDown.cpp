// Build Heap Top-Down — build a min-heap by inserting elements one-by-one with sift-up
#include <vector>

void siftUp(std::vector<int>& heap, int childIdx) {
    while (childIdx > 0) {
        int parentIdx = (childIdx - 1) / 2; // @step:sift-up
        // If child is smaller than parent, swap to restore min-heap property
        if (heap[childIdx] < heap[parentIdx]) {
            // @step:sift-up
            std::swap(heap[childIdx], heap[parentIdx]); // @step:heap-swap
            childIdx = parentIdx; // @step:sift-up
        } else {
            break; // @step:sift-up
        }
    }
}

std::vector<int> buildHeapTopDown(std::vector<int>& inputArray) {
    std::vector<int> heap; // @step:initialize
    // Insert each element at the end and restore heap property by sifting up
    for (int value : inputArray) {
        heap.push_back(value); // @step:heap-insert
        siftUp(heap, (int)heap.size() - 1); // @step:sift-up
    }
    return heap; // @step:complete
}
