// First Negative in Window — O(n) using a deque to track negative indices
#include <vector>
#include <deque>

std::vector<int> firstNegativeInWindow(const std::vector<int>& inputArray, int windowSize) {
    int arrayLength = (int)inputArray.size();

    if (arrayLength == 0 || windowSize <= 0 || windowSize > arrayLength) {
        // @step:initialize
        return {}; // @step:initialize
    }

    // Deque stores indices of negative numbers in current window
    std::deque<int> negativeIndices; // @step:initialize
    std::vector<int> result;

    // Process first window
    for (int initIndex = 0; initIndex < windowSize; initIndex++) { // @step:move-window
        if (inputArray[initIndex] < 0) { // @step:move-window
            negativeIndices.push_back(initIndex); // @step:move-window
        }
    }

    // Record result for first window
    result.push_back(!negativeIndices.empty() ? inputArray[negativeIndices.front()] : 0); // @step:compare

    // Slide window across remaining positions
    for (int rightIndex = windowSize; rightIndex < arrayLength; rightIndex++) {
        int leftIndex = rightIndex - windowSize;

        // Remove indices that are out of current window
        if (!negativeIndices.empty() && negativeIndices.front() <= leftIndex) { // @step:shrink-window
            negativeIndices.pop_front(); // @step:shrink-window
        }

        // Add new element if negative
        if (inputArray[rightIndex] < 0) { // @step:expand-window
            negativeIndices.push_back(rightIndex); // @step:expand-window
        }

        // Record first negative in current window (or 0 if none)
        result.push_back(!negativeIndices.empty() ? inputArray[negativeIndices.front()] : 0); // @step:compare
    }

    return result; // @step:complete
}
