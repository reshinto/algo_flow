// Last Stone Weight — repeatedly smash the two heaviest stones, return the last remaining weight
#include <vector>

void siftDownLSW(std::vector<int>& heap, int parentIdx) {
    while (true) {
        int largestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (leftIdx < (int)heap.size() && heap[leftIdx] > heap[largestIdx]) {
            // @step:compare
            largestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < (int)heap.size() && heap[rightIdx] > heap[largestIdx]) {
            // @step:compare
            largestIdx = rightIdx; // @step:sift-down
        }
        if (largestIdx == parentIdx) break; // @step:sift-down
        std::swap(heap[parentIdx], heap[largestIdx]); // @step:heap-swap
        parentIdx = largestIdx; // @step:sift-down
    }
}

int extractMax(std::vector<int>& arr) {
    int maxValue = arr[0]; // @step:heap-extract
    arr[0] = arr.back(); // @step:heap-swap
    arr.pop_back(); // @step:heap-extract
    siftDownLSW(arr, 0); // @step:sift-down
    return maxValue;
}

void insertValue(std::vector<int>& arr, int value) {
    arr.push_back(value); // @step:heap-insert
    int currentIdx = (int)arr.size() - 1; // @step:sift-up
    while (currentIdx > 0) {
        int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
        if (arr[parentIdx] >= arr[currentIdx]) break; // @step:compare
        std::swap(arr[parentIdx], arr[currentIdx]); // @step:heap-swap
        currentIdx = parentIdx; // @step:sift-up
    }
}

int lastStoneWeight(std::vector<int> stones) {
    std::vector<int> heap = stones; // @step:initialize
    int heapSize = (int)heap.size();

    // Build max-heap using Floyd's algorithm
    for (int startIdx = heapSize / 2 - 1; startIdx >= 0; startIdx--) {
        siftDownLSW(heap, startIdx); // @step:sift-down
    }

    while ((int)heap.size() >= 2) {
        int heaviest = extractMax(heap); // @step:heap-extract
        int secondHeaviest = extractMax(heap); // @step:heap-extract
        if (heaviest != secondHeaviest) {
            // @step:compare
            insertValue(heap, heaviest - secondHeaviest); // @step:heap-insert
        }
    }

    return heap.empty() ? 0 : heap[0]; // @step:complete
}
