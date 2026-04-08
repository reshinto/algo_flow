// Meta Binary Search (One-Sided Binary Search) — uses bit manipulation to build position
#include <vector>
#include <cmath>

int metaBinarySearch(const std::vector<int>& sortedArray, int targetValue) {
    // @step:initialize
    int arrayLength = static_cast<int>(sortedArray.size()); // @step:initialize
    if (arrayLength == 0) return -1; // @step:initialize

    int bitCount = static_cast<int>(std::floor(std::log2(arrayLength))); // @step:initialize
    int position = 0; // @step:initialize

    for (int bitIndex = bitCount; bitIndex >= 0; bitIndex--) {
        // @step:compare
        int newPosition = position | (1 << bitIndex); // @step:compare

        if (newPosition < arrayLength && sortedArray[newPosition] <= targetValue) {
            // @step:compare,eliminate
            position = newPosition; // @step:eliminate
        }
    }

    if (sortedArray[position] == targetValue) {
        // @step:compare,found
        return position; // @step:found
    }

    return -1; // @step:complete
}
