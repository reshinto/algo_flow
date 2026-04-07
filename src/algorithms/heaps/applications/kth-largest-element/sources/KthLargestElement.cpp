// Kth Largest Element — find the kth largest element using a min-heap of size k
#include <vector>

void siftUp(std::vector<int>& heap, int idx) {
    while (idx > 0) {
        int parentIdx = (idx - 1) / 2; // @step:sift-up
        if (heap[parentIdx] <= heap[idx]) break; // @step:compare
        std::swap(heap[parentIdx], heap[idx]); // @step:heap-swap
        idx = parentIdx; // @step:sift-up
    }
}

void siftDown(std::vector<int>& heap, int parentIdx, int size) {
    while (true) {
        int smallestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (leftIdx < size && heap[leftIdx] < heap[smallestIdx]) {
            // @step:compare
            smallestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < size && heap[rightIdx] < heap[smallestIdx]) {
            // @step:compare
            smallestIdx = rightIdx; // @step:sift-down
        }
        if (smallestIdx == parentIdx) break; // @step:sift-down
        std::swap(heap[parentIdx], heap[smallestIdx]); // @step:heap-swap
        parentIdx = smallestIdx; // @step:sift-down
    }
}

int kthLargestElement(std::vector<int>& array, int kValue) {
    std::vector<int> minHeap; // @step:initialize

    for (int element : array) {
        if ((int)minHeap.size() < kValue) {
            minHeap.push_back(element); // @step:heap-insert
            siftUp(minHeap, (int)minHeap.size() - 1); // @step:sift-up
        } else if (element > minHeap[0]) {
            // @step:compare
            minHeap[0] = element; // @step:heap-extract
            siftDown(minHeap, 0, (int)minHeap.size()); // @step:sift-down
        }
    }

    return minHeap[0]; // @step:complete
}
