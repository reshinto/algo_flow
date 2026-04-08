// Task Scheduler Heap — minimum intervals to complete all tasks with cooldown (LeetCode 621)
#include <vector>
#include <string>
#include <map>

void siftUpTSH(std::vector<int>& arr, int currentIdx) {
    while (currentIdx > 0) {
        int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
        if (arr[parentIdx] >= arr[currentIdx]) break; // @step:compare
        std::swap(arr[parentIdx], arr[currentIdx]); // @step:heap-swap
        currentIdx = parentIdx; // @step:sift-up
    }
}

void siftDownTSH(std::vector<int>& arr, int parentIdx) {
    while (true) {
        int largestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        if (leftIdx < (int)arr.size() && arr[leftIdx] > arr[largestIdx]) {
            // @step:compare
            largestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < (int)arr.size() && arr[rightIdx] > arr[largestIdx]) {
            // @step:compare
            largestIdx = rightIdx; // @step:sift-down
        }
        if (largestIdx == parentIdx) break; // @step:sift-down
        std::swap(arr[parentIdx], arr[largestIdx]); // @step:heap-swap
        parentIdx = largestIdx; // @step:sift-down
    }
}

int taskSchedulerHeap(const std::string& tasks, int cooldown) {
    // Count task frequencies
    std::map<char,int> frequencyMap; // @step:initialize
    for (char taskName : tasks) {
        frequencyMap[taskName]++; // @step:initialize
    }

    // Build max-heap of frequencies
    std::vector<int> heap; // @step:initialize
    for (auto& [taskName, frequency] : frequencyMap) {
        heap.push_back(frequency); // @step:heap-insert
    }

    // Heapify
    for (int startIdx = (int)heap.size() / 2 - 1; startIdx >= 0; startIdx--) {
        siftDownTSH(heap, startIdx); // @step:sift-down
    }

    int totalIntervals = 0; // @step:initialize

    while (!heap.empty()) {
        int cycleSize = cooldown + 1; // @step:initialize
        std::vector<int> roundTasks; // @step:initialize

        // Extract up to cooldown+1 tasks this round
        for (int slotIndex = 0; slotIndex < cycleSize && !heap.empty(); slotIndex++) {
            int maxFrequency = heap[0]; // @step:heap-extract
            heap[0] = heap.back(); // @step:heap-swap
            heap.pop_back(); // @step:heap-extract
            if (!heap.empty()) siftDownTSH(heap, 0); // @step:sift-down
            roundTasks.push_back(maxFrequency - 1); // @step:compare
        }

        // Reinsert tasks with remaining frequency
        for (int remainingFrequency : roundTasks) {
            if (remainingFrequency > 0) {
                heap.push_back(remainingFrequency); // @step:heap-insert
                siftUpTSH(heap, (int)heap.size() - 1);
            }
        }

        // Add full cycle or just the tasks if this is the last round
        if (!heap.empty()) {
            totalIntervals += cycleSize; // @step:compare
        } else {
            totalIntervals += (int)roundTasks.size(); // @step:compare
        }
    }

    return totalIntervals; // @step:complete
}
