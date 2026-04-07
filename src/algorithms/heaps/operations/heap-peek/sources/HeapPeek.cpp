// Heap Peek — return the minimum element (root) from a min-heap without removing it
#include <vector>
#include <optional>

std::optional<int> heapPeek(std::vector<int> heapArray) {
    std::vector<int> array = heapArray; // @step:initialize
    // The root at index 0 is always the minimum in a valid min-heap
    if (array.empty()) return std::nullopt;
    int minimumValue = array[0]; // @step:visit
    return minimumValue; // @step:complete
}
