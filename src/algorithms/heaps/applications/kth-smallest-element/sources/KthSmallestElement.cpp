// Kth Smallest Element — find the kth smallest element using a max-heap of size k
#include <vector>

void siftUp(std::vector<int>& heap, int idx) {
    while (idx > 0) {
        int parentIdx = (idx - 1) / 2; // @step:sift-up
        if (heap[parentIdx] >= heap[idx]) break; // @step:compare
        std::swap(heap[parentIdx], heap[idx]); // @step:heap-swap
        idx = parentIdx; // @step:sift-up
    }
}

void siftDown(std::vector<int>& heap, int parentIdx, int size) {
    while (true) {
        int largestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (leftIdx < size && heap[leftIdx] > heap[largestIdx]) {
            // @step:compare
            largestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < size && heap[rightIdx] > heap[largestIdx]) {
            // @step:compare
            largestIdx = rightIdx; // @step:sift-down
        }
        if (largestIdx == parentIdx) break; // @step:sift-down
        std::swap(heap[parentIdx], heap[largestIdx]); // @step:heap-swap
        parentIdx = largestIdx; // @step:sift-down
    }
}

int kthSmallestElement(const std::vector<int>& array, int kValue) {
    std::vector<int> maxHeap; // @step:initialize

    for (int element : array) {
        if ((int)maxHeap.size() < kValue) {
            maxHeap.push_back(element); // @step:heap-insert
            siftUp(maxHeap, (int)maxHeap.size() - 1); // @step:sift-up
        } else if (element < maxHeap[0]) {
            // @step:compare
            maxHeap[0] = element; // @step:heap-extract
            siftDown(maxHeap, 0, (int)maxHeap.size()); // @step:sift-down
        }
    }

    return maxHeap[0]; // @step:complete
}
