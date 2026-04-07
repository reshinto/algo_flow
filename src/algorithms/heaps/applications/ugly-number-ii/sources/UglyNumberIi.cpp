// Ugly Number II — find the nth ugly number (only prime factors 2, 3, 5) using a min-heap
#include <vector>
#include <set>

void siftUpUN(std::vector<long long>& heap, int currentIdx) {
    while (currentIdx > 0) {
        int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
        if (heap[currentIdx] < heap[parentIdx]) {
            // @step:compare
            std::swap(heap[currentIdx], heap[parentIdx]); // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        } else {
            break; // @step:compare
        }
    }
}

void siftDownUN(std::vector<long long>& heap, int heapSize, int parentIdx) {
    while (true) {
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        int smallestIdx = parentIdx; // @step:sift-down
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

long long uglyNumberIi(int nthPosition) {
    std::vector<long long> heap = {1}; // @step:initialize
    std::set<long long> seen = {1};    // @step:initialize
    std::vector<long long> primeFactors = {2, 3, 5}; // @step:initialize
    long long currentUgly = 1;         // @step:initialize

    for (int iteration = 0; iteration < nthPosition; iteration++) {
        // Extract minimum (root)
        currentUgly = heap[0]; // @step:heap-extract
        heap[0] = heap.back(); // @step:heap-extract
        heap.pop_back(); // @step:heap-extract
        siftDownUN(heap, (int)heap.size(), 0); // @step:sift-down
        // Generate next candidates by multiplying by 2, 3, 5
        for (long long factor : primeFactors) {
            long long candidate = currentUgly * factor; // @step:heap-insert
            if (seen.find(candidate) == seen.end()) {
                seen.insert(candidate); // @step:heap-insert
                heap.push_back(candidate); // @step:heap-insert
                siftUpUN(heap, (int)heap.size() - 1); // @step:sift-up
            }
        }
    }

    return currentUgly; // @step:complete
}
