// Jump Search — jump forward by sqrt(n) blocks, then linear scan within the block
#include <vector>
#include <cmath>
#include <algorithm>

int jumpSearch(const std::vector<int>& sortedArray, int targetValue) {
    // @step:initialize
    int arrayLength = static_cast<int>(sortedArray.size()); // @step:initialize
    if (arrayLength == 0) return -1; // @step:initialize

    int blockSize = static_cast<int>(std::floor(std::sqrt(static_cast<double>(arrayLength)))); // @step:initialize
    int blockStart = 0; // @step:initialize
    int jumpEnd = blockSize; // @step:initialize

    while (jumpEnd < arrayLength && sortedArray[jumpEnd - 1] < targetValue) {
        // @step:visit
        blockStart = jumpEnd; // @step:visit
        jumpEnd += blockSize; // @step:visit
    }

    // Linear scan within the identified block
    int scanEnd = std::min(jumpEnd, arrayLength); // @step:compare
    for (int currentIndex = blockStart; currentIndex < scanEnd; currentIndex++) {
        // @step:compare
        if (sortedArray[currentIndex] == targetValue) {
            // @step:compare,found
            return currentIndex; // @step:found
        }
    }

    return -1; // @step:complete
}
