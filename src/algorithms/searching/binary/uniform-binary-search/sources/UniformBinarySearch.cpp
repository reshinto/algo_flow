// Uniform Binary Search — precomputes delta lookup table for uniform jump sizes
#include <vector>
#include <cmath>

int uniformBinarySearch(const std::vector<int>& sortedArray, int targetValue) {
    // @step:initialize
    int arrayLength = static_cast<int>(sortedArray.size()); // @step:initialize
    if (arrayLength == 0) return -1; // @step:initialize

    // Build the delta lookup table: delta[k] = ceil(delta[k-1] / 2)
    std::vector<int> deltaTable; // @step:initialize
    int deltaValue = static_cast<int>(std::ceil(static_cast<double>(arrayLength) / 2.0)); // @step:initialize
    deltaTable.push_back(deltaValue); // @step:initialize
    while (deltaValue > 1) {
        // @step:initialize
        deltaValue = static_cast<int>(std::ceil(static_cast<double>(deltaValue) / 2.0)); // @step:initialize
        deltaTable.push_back(deltaValue); // @step:initialize
    }
    // Ensure enough steps to reach any element in the array
    int logLen = static_cast<int>(std::ceil(std::log2(arrayLength))) + 1;
    if (static_cast<int>(deltaTable.size()) < logLen) {
        // @step:initialize
        deltaTable.push_back(1); // @step:initialize
    }

    int currentIndex = (deltaTable[0] > 0 ? deltaTable[0] : 1) - 1; // @step:initialize
    int stepLevel = 0; // @step:initialize

    while (true) {
        // @step:compare
        int currentValue = sortedArray[currentIndex]; // @step:compare

        if (currentValue == targetValue) {
            // @step:compare,found
            return currentIndex; // @step:found
        }

        stepLevel++; // @step:eliminate
        int nextDelta = (stepLevel < static_cast<int>(deltaTable.size())) ? deltaTable[stepLevel] : 0; // @step:eliminate

        if (nextDelta == 0) break; // @step:eliminate

        int previousIndex = currentIndex; // @step:eliminate
        if (currentValue < targetValue) {
            // @step:eliminate
            // Move right
            currentIndex += nextDelta; // @step:eliminate
            if (currentIndex >= arrayLength) currentIndex = arrayLength - 1; // @step:eliminate
        } else {
            // @step:eliminate
            // Move left
            currentIndex -= nextDelta; // @step:eliminate
            if (currentIndex < 0) currentIndex = 0; // @step:eliminate
        }
        if (currentIndex == previousIndex) break; // @step:eliminate
    }

    return -1; // @step:complete
}
