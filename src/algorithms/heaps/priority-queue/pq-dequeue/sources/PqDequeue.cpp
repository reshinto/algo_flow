// PQ Dequeue — remove and return the highest-priority (smallest) element from a min-heap priority queue
#include <vector>
#include <utility>

std::pair<int, std::vector<int>> pqDequeue(std::vector<int> priorityQueue) {
    std::vector<int> queue = priorityQueue; // @step:initialize
    int dequeuedValue = queue[0]; // @step:heap-extract
    int lastIdx = (int)queue.size() - 1; // @step:heap-extract
    // Move last element to root and remove the last position
    std::swap(queue[0], queue[lastIdx]); // @step:heap-swap
    queue.pop_back(); // @step:heap-extract
    // Sift down the new root to restore heap property
    int size = (int)queue.size();
    int parentIdx = 0; // @step:sift-down
    while (true) {
        // @step:sift-down
        int smallestIdx = parentIdx; // @step:sift-down
        int leftIdx = 2 * parentIdx + 1; // @step:sift-down
        int rightIdx = 2 * parentIdx + 2; // @step:sift-down
        // Find the smallest among parent, left child, and right child
        if (leftIdx < size && queue[leftIdx] < queue[smallestIdx]) {
            // @step:compare
            smallestIdx = leftIdx; // @step:sift-down
        }
        if (rightIdx < size && queue[rightIdx] < queue[smallestIdx]) {
            // @step:compare
            smallestIdx = rightIdx; // @step:sift-down
        }
        if (smallestIdx == parentIdx) break; // @step:sift-down
        // Swap parent with highest-priority child
        std::swap(queue[parentIdx], queue[smallestIdx]); // @step:heap-swap
        parentIdx = smallestIdx; // @step:sift-down
    }
    return {dequeuedValue, queue}; // @step:complete
}
