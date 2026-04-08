// Heap Insert — append a value to a min-heap and restore heap property via sift-up
#include <vector>

std::vector<int> heapInsert(std::vector<int> heapArray, int value) {
    std::vector<int> array = heapArray; // @step:initialize
    array.push_back(value); // @step:heap-insert
    int currentIdx = (int)array.size() - 1; // @step:heap-insert
    // Sift up: while not at root, compare with parent and swap if smaller
    while (currentIdx > 0) {
        // @step:sift-up
        int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
        if (array[currentIdx] >= array[parentIdx]) break; // @step:sift-up
        // Swap with parent to restore heap property
        std::swap(array[currentIdx], array[parentIdx]); // @step:heap-swap
        currentIdx = parentIdx; // @step:sift-up
    }
    return array; // @step:complete
}
