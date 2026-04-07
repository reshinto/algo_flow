// Sort Nearly Sorted — sort an array where each element is at most k positions from its sorted position
#include <vector>
#include <algorithm>

void siftUp(std::vector<int>& arr, int currentIdx) {
    while (currentIdx > 0) {
        int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
        if (arr[parentIdx] <= arr[currentIdx]) break; // @step:compare
        std::swap(arr[parentIdx], arr[currentIdx]); // @step:heap-swap
        currentIdx = parentIdx; // @step:sift-up
    }
}

void siftDown(std::vector<int>& arr, int parentIdx) {
    while (true) {
        int smallestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (leftIdx < (int)arr.size() && arr[leftIdx] < arr[smallestIdx]) {
            // @step:compare
            smallestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < (int)arr.size() && arr[rightIdx] < arr[smallestIdx]) {
            // @step:compare
            smallestIdx = rightIdx; // @step:sift-down
        }
        if (smallestIdx == parentIdx) break; // @step:sift-down
        std::swap(arr[parentIdx], arr[smallestIdx]); // @step:heap-swap
        parentIdx = smallestIdx; // @step:sift-down
    }
}

void heapInsert(std::vector<int>& arr, int value) {
    arr.push_back(value); // @step:heap-insert
    siftUp(arr, (int)arr.size() - 1);
}

int heapExtract(std::vector<int>& arr) {
    int minValue = arr[0]; // @step:heap-extract
    arr[0] = arr.back(); // @step:heap-swap
    arr.pop_back(); // @step:heap-extract
    if (!arr.empty()) siftDown(arr, 0); // @step:sift-down
    return minValue;
}

std::vector<int> sortNearlySorted(std::vector<int>& array, int kValue) {
    std::vector<int> result; // @step:initialize
    std::vector<int> heap; // @step:initialize

    // Insert first k+1 elements into the min-heap
    int initialCount = std::min(kValue, (int)array.size() - 1);
    for (int insertIdx = 0; insertIdx <= initialCount; insertIdx++) {
        heapInsert(heap, array[insertIdx]); // @step:heap-insert
    }

    // For each remaining element, extract-min to result and insert next element
    for (int nextIdx = kValue + 1; nextIdx < (int)array.size(); nextIdx++) {
        result.push_back(heapExtract(heap)); // @step:heap-extract
        heapInsert(heap, array[nextIdx]); // @step:heap-insert
    }

    // Drain the remaining elements from the heap
    while (!heap.empty()) {
        result.push_back(heapExtract(heap)); // @step:heap-extract
    }

    return result; // @step:complete
}
