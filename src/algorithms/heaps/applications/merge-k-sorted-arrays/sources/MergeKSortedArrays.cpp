// Merge K Sorted Arrays — merge k sorted arrays into one sorted array using a min-heap
#include <vector>
#include <tuple>
#include <climits>

typedef std::tuple<int,int,int> HeapEntry; // (value, arrayIndex, elementIndex)

std::vector<int> mergeKSortedArrays(const std::vector<std::vector<int>>& arrays) {
    std::vector<int> result; // @step:initialize
    std::vector<HeapEntry> heap; // @step:initialize

    // Insert first element of each array into the heap
    for (int arrayIndex = 0; arrayIndex < (int)arrays.size(); arrayIndex++) {
        // @step:initialize
        if (!arrays[arrayIndex].empty()) {
            // @step:initialize
            heap.push_back({arrays[arrayIndex][0], arrayIndex, 0}); // @step:heap-insert
        }
    }

    // Build initial min-heap using sift-up
    for (int insertedIdx = 1; insertedIdx < (int)heap.size(); insertedIdx++) {
        // @step:sift-up
        int childIdx = insertedIdx; // @step:sift-up
        while (childIdx > 0) {
            // @step:sift-up
            int parentIdx = (childIdx - 1) / 2; // @step:sift-up
            if (std::get<0>(heap[parentIdx]) <= std::get<0>(heap[childIdx])) break; // @step:compare
            std::swap(heap[parentIdx], heap[childIdx]); // @step:heap-swap
            childIdx = parentIdx; // @step:sift-up
        }
    }

    // Extract min and insert next element from the same array
    while (!heap.empty()) {
        auto [minValue, arrayIndex, elementIndex] = heap[0]; // @step:heap-extract
        result.push_back(minValue); // @step:heap-extract

        int nextElementIndex = elementIndex + 1; // @step:heap-extract
        if (nextElementIndex < (int)arrays[arrayIndex].size()) {
            // Replace root with next element from the same array
            heap[0] = {arrays[arrayIndex][nextElementIndex], arrayIndex, nextElementIndex}; // @step:heap-insert
        } else {
            // No more elements — remove root
            HeapEntry lastEntry = heap.back(); // @step:heap-extract
            heap.pop_back();
            if (!heap.empty()) {
                heap[0] = lastEntry; // @step:heap-extract
            }
        }

        // Sift down the root to restore heap property
        if ((int)heap.size() > 1) {
            int parentIdx = 0; // @step:sift-down
            while (true) {
                // @step:sift-down
                int smallestIdx = parentIdx; // @step:sift-down
                int leftIdx = 2 * parentIdx + 1; // @step:sift-down
                int rightIdx = 2 * parentIdx + 2; // @step:sift-down
                if (leftIdx < (int)heap.size() && std::get<0>(heap[leftIdx]) < std::get<0>(heap[smallestIdx])) {
                    // @step:compare
                    smallestIdx = leftIdx; // @step:sift-down
                }
                if (rightIdx < (int)heap.size() && std::get<0>(heap[rightIdx]) < std::get<0>(heap[smallestIdx])) {
                    // @step:compare
                    smallestIdx = rightIdx; // @step:sift-down
                }
                if (smallestIdx == parentIdx) break; // @step:sift-down
                std::swap(heap[parentIdx], heap[smallestIdx]); // @step:heap-swap
                parentIdx = smallestIdx; // @step:sift-down
            }
        }
    }

    return result; // @step:complete
}
