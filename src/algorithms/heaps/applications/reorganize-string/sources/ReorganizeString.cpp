// Reorganize String — rearrange string so no two adjacent characters are the same (LeetCode 767)
#include <vector>
#include <string>
#include <map>
#include <utility>

typedef std::pair<int,char> HeapEntry;

void siftUpRS(std::vector<HeapEntry>& arr, int currentIdx) {
    while (currentIdx > 0) {
        int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
        if (arr[parentIdx].first >= arr[currentIdx].first) break; // @step:compare
        std::swap(arr[parentIdx], arr[currentIdx]); // @step:heap-swap
        currentIdx = parentIdx; // @step:sift-up
    }
}

void siftDownRS(std::vector<HeapEntry>& arr, int parentIdx) {
    while (true) {
        int largestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (leftIdx < (int)arr.size() && arr[leftIdx].first > arr[largestIdx].first) {
            // @step:compare
            largestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < (int)arr.size() && arr[rightIdx].first > arr[largestIdx].first) {
            // @step:compare
            largestIdx = rightIdx; // @step:sift-down
        }
        if (largestIdx == parentIdx) break; // @step:sift-down
        std::swap(arr[parentIdx], arr[largestIdx]); // @step:heap-swap
        parentIdx = largestIdx; // @step:sift-down
    }
}

std::string reorganizeString(const std::string& text) {
    // Count character frequencies
    std::map<char,int> frequencyMap; // @step:initialize
    for (char character : text) {
        frequencyMap[character]++; // @step:initialize
    }

    // Build max-heap entries: (frequency, character)
    std::vector<HeapEntry> heap; // @step:initialize
    for (auto& [character, frequency] : frequencyMap) {
        heap.push_back({frequency, character}); // @step:heap-insert
    }

    // Heapify
    for (int startIdx = (int)heap.size() / 2 - 1; startIdx >= 0; startIdx--) {
        siftDownRS(heap, startIdx); // @step:sift-down
    }

    std::string result = ""; // @step:initialize
    HeapEntry prevEntry = {0, '\0'}; // @step:initialize
    bool hasPrev = false;

    while (!heap.empty()) {
        // Extract most frequent
        HeapEntry topEntry = heap[0]; // @step:heap-extract
        heap[0] = heap.back(); // @step:heap-swap
        heap.pop_back(); // @step:heap-extract
        if (!heap.empty()) siftDownRS(heap, 0); // @step:sift-down

        result += topEntry.second; // @step:heap-extract
        topEntry.first -= 1; // @step:heap-extract

        // Reinsert previous entry if it still has frequency
        if (hasPrev && prevEntry.first > 0) {
            heap.push_back(prevEntry); // @step:heap-insert
            siftUpRS(heap, (int)heap.size() - 1); // @step:sift-up
        }

        // Hold current entry for next iteration to prevent adjacency
        if (topEntry.first > 0) { // @step:compare
            prevEntry = topEntry;
            hasPrev = true;
        } else {
            hasPrev = false;
        }

        // Impossible case: same character would be adjacent
        if (heap.empty() && hasPrev) {
            return ""; // @step:complete
        }
    }

    return result; // @step:complete
}
