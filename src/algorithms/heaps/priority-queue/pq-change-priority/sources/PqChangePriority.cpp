// PQ Change Priority — update element priority at a given index, then restore heap order via sift-up or sift-down
#include <vector>

std::vector<int> pqChangePriority(std::vector<int> priorityQueue, int targetIndex, int newValue) {
    std::vector<int> queue = priorityQueue; // @step:initialize
    int oldValue = queue[targetIndex]; // @step:heap-update
    queue[targetIndex] = newValue; // @step:heap-update

    if (newValue < oldValue) {
        // Priority increased (value decreased) — sift up
        int currentIdx = targetIndex; // @step:sift-up
        while (currentIdx > 0) {
            // @step:sift-up
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (queue[currentIdx] >= queue[parentIdx]) break; // @step:compare
            std::swap(queue[currentIdx], queue[parentIdx]); // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        }
    } else {
        // Priority decreased (value increased) — sift down
        int parentIdx = targetIndex; // @step:sift-down
        int size = (int)queue.size();
        while (true) {
            // @step:sift-down
            int smallestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            if (leftIdx < size && queue[leftIdx] < queue[smallestIdx]) {
                // @step:compare
                smallestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < size && queue[rightIdx] < queue[smallestIdx]) {
                // @step:compare
                smallestIdx = rightIdx; // @step:sift-down
            }
            if (smallestIdx == parentIdx) break; // @step:sift-down
            std::swap(queue[parentIdx], queue[smallestIdx]); // @step:heap-swap
            parentIdx = smallestIdx; // @step:sift-down
        }
    }

    return queue; // @step:complete
}
