// Top-K Frequent Elements (Heap) — find k most frequent elements using a min-heap of size k
#include <vector>
#include <map>
#include <utility>

typedef std::pair<int,int> FreqEntry; // (frequency, element)

std::vector<int> topKFrequentHeap(std::vector<int>& array, int kValue) {
    // Count frequencies of each element
    std::map<int,int> frequencyMap; // @step:initialize
    for (int element : array) {
        // @step:initialize
        frequencyMap[element]++; // @step:initialize
    }

    // Min-heap: each entry is (frequency, element), heap ordered by frequency
    std::vector<FreqEntry> heap; // @step:initialize
    std::vector<FreqEntry> entries(frequencyMap.begin(), frequencyMap.end()); // @step:initialize

    // Process each unique element
    for (auto& [element, frequency] : entries) {
        if ((int)heap.size() < kValue) {
            // Heap not full — insert and sift up
            heap.push_back({frequency, element}); // @step:heap-insert
            int childIdx = (int)heap.size() - 1; // @step:sift-up
            while (childIdx > 0) {
                // @step:sift-up
                int parentIdx = (childIdx - 1) / 2; // @step:sift-up
                if (heap[parentIdx].first <= heap[childIdx].first) break; // @step:compare
                std::swap(heap[parentIdx], heap[childIdx]); // @step:heap-swap
                childIdx = parentIdx; // @step:sift-up
            }
        } else if (frequency > heap[0].first) {
            // Current freq beats root — replace root and sift down
            heap[0] = {frequency, element}; // @step:heap-extract
            int parentIdx = 0; // @step:sift-down
            while (true) {
                // @step:sift-down
                int smallestIdx = parentIdx; // @step:sift-down
                int leftIdx = 2 * parentIdx + 1; // @step:sift-down
                int rightIdx = 2 * parentIdx + 2; // @step:sift-down
                if (leftIdx < (int)heap.size() && heap[leftIdx].first < heap[smallestIdx].first) {
                    // @step:compare
                    smallestIdx = leftIdx; // @step:sift-down
                }
                if (rightIdx < (int)heap.size() && heap[rightIdx].first < heap[smallestIdx].first) {
                    // @step:compare
                    smallestIdx = rightIdx; // @step:sift-down
                }
                if (smallestIdx == parentIdx) break; // @step:sift-down
                std::swap(heap[parentIdx], heap[smallestIdx]); // @step:heap-swap
                parentIdx = smallestIdx; // @step:sift-down
            }
        }
    }

    // Extract elements from the heap (the k most frequent)
    std::vector<int> result; // @step:complete
    for (auto& entry : heap) result.push_back(entry.second);
    return result; // @step:complete
}
