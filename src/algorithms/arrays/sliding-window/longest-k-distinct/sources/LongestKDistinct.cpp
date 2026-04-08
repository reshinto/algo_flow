// Longest K-Distinct — O(n) variable sliding window with at-most K distinct elements
#include <vector>
#include <unordered_map>
#include <utility>

std::pair<int, int> longestKDistinct(const std::vector<int>& inputArray, int maxDistinct) {
    int arrayLength = (int)inputArray.size();

    if (arrayLength == 0 || maxDistinct <= 0) {
        // @step:initialize
        return {0, 0}; // @step:initialize
    }

    std::unordered_map<int, int> frequencyMap; // @step:initialize
    int windowStart = 0;
    int maxLength = 0;
    int bestStart = 0;

    for (int windowEnd = 0; windowEnd < arrayLength; windowEnd++) {
        int incomingElement = inputArray[windowEnd]; // @step:expand-window
        frequencyMap[incomingElement]++; // @step:expand-window

        // Shrink from the left while distinct count exceeds maxDistinct
        while ((int)frequencyMap.size() > maxDistinct) {
            int outgoingElement = inputArray[windowStart]; // @step:shrink-window
            int outgoingCount = frequencyMap[outgoingElement] - 1; // @step:shrink-window
            if (outgoingCount == 0) { // @step:shrink-window
                frequencyMap.erase(outgoingElement); // @step:shrink-window
            } else {
                frequencyMap[outgoingElement] = outgoingCount; // @step:shrink-window
            }
            windowStart++; // @step:shrink-window
        }

        int currentLength = windowEnd - windowStart + 1; // @step:compare
        if (currentLength > maxLength) { // @step:compare
            maxLength = currentLength; // @step:compare
            bestStart = windowStart; // @step:compare
        }
    }

    return {maxLength, bestStart}; // @step:complete
}
