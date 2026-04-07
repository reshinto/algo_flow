// K Closest Points to Origin — use a max-heap of size k (by distance²) to find the k nearest points
#include <vector>
#include <utility>

typedef std::pair<int, std::pair<int,int>> HeapEntry;

long long distanceSquared(std::pair<int,int> point) {
    return (long long)point.first * point.first + (long long)point.second * point.second; // @step:initialize
}

void siftUp(std::vector<HeapEntry>& heap, int currentIdx) {
    while (currentIdx > 0) {
        int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
        if (heap[currentIdx].first > heap[parentIdx].first) {
            // @step:compare
            std::swap(heap[currentIdx], heap[parentIdx]); // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        } else {
            break; // @step:compare
        }
    }
}

void siftDown(std::vector<HeapEntry>& heap, int heapSize, int parentIdx) {
    while (true) {
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        int largestIdx = parentIdx; // @step:sift-down
        if (leftIdx < heapSize && heap[leftIdx].first > heap[largestIdx].first) {
            // @step:compare
            largestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < heapSize && heap[rightIdx].first > heap[largestIdx].first) {
            // @step:compare
            largestIdx = rightIdx; // @step:sift-down
        }
        if (largestIdx == parentIdx) break; // @step:sift-down
        std::swap(heap[parentIdx], heap[largestIdx]); // @step:heap-swap
        parentIdx = largestIdx; // @step:sift-down
    }
}

std::vector<std::pair<int,int>> kClosestPoints(std::vector<std::pair<int,int>>& points, int kValue) {
    std::vector<HeapEntry> heap; // @step:initialize

    for (auto& point : points) {
        long long dist = distanceSquared(point); // @step:heap-insert
        if ((int)heap.size() < kValue) {
            heap.push_back({(int)dist, point}); // @step:heap-insert
            siftUp(heap, (int)heap.size() - 1); // @step:sift-up
        } else if (!heap.empty() && (int)dist < heap[0].first) {
            // Current point is closer than the farthest in heap — replace root
            heap[0] = {(int)dist, point}; // @step:heap-extract
            siftDown(heap, (int)heap.size(), 0); // @step:sift-down
        }
    }

    std::vector<std::pair<int,int>> result; // @step:complete
    for (auto& entry : heap) result.push_back(entry.second);
    return result; // @step:complete
}
