// PQ Enqueue — insert an element into a min-heap-based priority queue and restore heap order via sift-up
#include <vector>

std::vector<int> pqEnqueue(std::vector<int> priorityQueue, int value) {
    std::vector<int> queue = priorityQueue; // @step:initialize
    queue.push_back(value); // @step:heap-insert
    int currentIdx = (int)queue.size() - 1; // @step:heap-insert
    // Sift up: bubble the new element toward the root until heap property holds
    while (currentIdx > 0) {
        // @step:sift-up
        int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
        if (queue[currentIdx] >= queue[parentIdx]) break; // @step:compare
        // New element has higher priority (smaller value) — swap with parent
        std::swap(queue[currentIdx], queue[parentIdx]); // @step:heap-swap
        currentIdx = parentIdx; // @step:sift-up
    }
    return queue; // @step:complete
}
