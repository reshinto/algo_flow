// Find Median from Data Stream — maintain running median using two heaps
// maxHeap stores the lower half (root = largest of lower half)
// minHeap stores the upper half (root = smallest of upper half)
#include <vector>
#include <stdexcept>

void siftUpMax(std::vector<int>& heap, int idx) {
    while (idx > 0) {
        int parentIdx = (idx - 1) / 2; // @step:sift-up
        if (heap[parentIdx] >= heap[idx]) break; // @step:compare
        std::swap(heap[parentIdx], heap[idx]); // @step:heap-swap
        idx = parentIdx; // @step:sift-up
    }
}

void siftDownMax(std::vector<int>& heap, int parentIdx) {
    int heapSize = (int)heap.size(); // @step:sift-down
    while (true) {
        int largestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (leftIdx < heapSize && heap[leftIdx] > heap[largestIdx]) {
            // @step:compare
            largestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < heapSize && heap[rightIdx] > heap[largestIdx]) {
            // @step:compare
            largestIdx = rightIdx; // @step:sift-down
        }
        if (largestIdx == parentIdx) break; // @step:sift-down
        std::swap(heap[parentIdx], heap[largestIdx]); // @step:heap-swap
        parentIdx = largestIdx; // @step:sift-down
    }
}

void siftUpMin(std::vector<int>& heap, int idx) {
    while (idx > 0) {
        int parentIdx = (idx - 1) / 2; // @step:sift-up
        if (heap[parentIdx] <= heap[idx]) break; // @step:compare
        std::swap(heap[parentIdx], heap[idx]); // @step:heap-swap
        idx = parentIdx; // @step:sift-up
    }
}

void siftDownMin(std::vector<int>& heap, int parentIdx) {
    int heapSize = (int)heap.size(); // @step:sift-down
    while (true) {
        int smallestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (leftIdx < heapSize && heap[leftIdx] < heap[smallestIdx]) {
            // @step:compare
            smallestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < heapSize && heap[rightIdx] < heap[smallestIdx]) {
            // @step:compare
            smallestIdx = rightIdx; // @step:sift-down
        }
        if (smallestIdx == parentIdx) break; // @step:sift-down
        std::swap(heap[parentIdx], heap[smallestIdx]); // @step:heap-swap
        parentIdx = smallestIdx; // @step:sift-down
    }
}

std::vector<double> findMedianStream(std::vector<int>& stream) {
    std::vector<int> maxHeap; // @step:initialize
    std::vector<int> minHeap; // @step:initialize
    std::vector<double> medians; // @step:initialize

    for (int num : stream) {
        // Insert into appropriate heap
        if (maxHeap.empty() || num <= maxHeap[0]) {
            maxHeap.push_back(num); // @step:heap-insert
            siftUpMax(maxHeap, (int)maxHeap.size() - 1); // @step:sift-up
        } else {
            minHeap.push_back(num); // @step:heap-insert
            siftUpMin(minHeap, (int)minHeap.size() - 1); // @step:sift-up
        }

        // Rebalance: maxHeap can be at most 1 larger than minHeap
        if (maxHeap.size() > minHeap.size() + 1) {
            int extracted = maxHeap[0]; // @step:heap-extract
            maxHeap[0] = maxHeap.back(); // @step:heap-extract
            maxHeap.pop_back(); // @step:heap-extract
            siftDownMax(maxHeap, 0); // @step:sift-down
            minHeap.push_back(extracted); // @step:heap-insert
            siftUpMin(minHeap, (int)minHeap.size() - 1); // @step:sift-up
        } else if (minHeap.size() > maxHeap.size()) {
            int extracted = minHeap[0]; // @step:heap-extract
            minHeap[0] = minHeap.back(); // @step:heap-extract
            minHeap.pop_back(); // @step:heap-extract
            siftDownMin(minHeap, 0); // @step:sift-down
            maxHeap.push_back(extracted); // @step:heap-insert
            siftUpMax(maxHeap, (int)maxHeap.size() - 1); // @step:sift-up
        }

        // Compute median
        double median;
        if (maxHeap.size() == minHeap.size()) {
            median = (maxHeap[0] + minHeap[0]) / 2.0; // @step:complete
        } else {
            median = maxHeap[0]; // @step:complete
        }
        medians.push_back(median);
    }

    return medians; // @step:complete
}
