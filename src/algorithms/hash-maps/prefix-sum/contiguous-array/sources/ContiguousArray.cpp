// Contiguous Array — find the longest subarray with equal number of 0s and 1s
#include <vector>
#include <unordered_map>
#include <algorithm>

int contiguousArray(const std::vector<int>& numbers) {
    std::unordered_map<int, int> prefixSumMap; // @step:initialize
    prefixSumMap[0] = -1;
    int runningSum = 0;
    int maxLength = 0;
    for (int elementIndex = 0; elementIndex < (int)numbers.size(); elementIndex++) {
        runningSum += (numbers[elementIndex] == 0) ? -1 : 1; // @step:check-prefix
        auto it = prefixSumMap.find(runningSum);
        if (it != prefixSumMap.end()) {
            int subarrayLength = elementIndex - it->second; // @step:prefix-found
            maxLength = std::max(maxLength, subarrayLength);
        } else {
            prefixSumMap[runningSum] = elementIndex; // @step:insert-key
        }
    }
    return maxLength; // @step:complete
}
