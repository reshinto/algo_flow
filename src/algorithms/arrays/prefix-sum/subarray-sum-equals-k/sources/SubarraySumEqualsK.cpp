// Subarray Sum Equals K — O(n) via prefix sum + hash map
#include <vector>
#include <unordered_map>

std::pair<int, std::vector<std::pair<int,int>>> subarraySumEqualsK(
    const std::vector<int>& inputArray, int target) {

    std::unordered_map<int, int> prefixSumMap; // @step:initialize
    prefixSumMap[0] = 1; // @step:initialize

    int runningSum = 0; // @step:initialize
    int foundCount = 0; // @step:initialize
    std::vector<std::pair<int,int>> subarrays; // @step:initialize

    for (int scanIndex = 0; scanIndex < (int)inputArray.size(); scanIndex++) {
        runningSum += inputArray[scanIndex]; // @step:visit

        int lookupKey = runningSum - target; // @step:compare

        if (prefixSumMap.count(lookupKey)) { // @step:compare
            int matchCount = prefixSumMap[lookupKey];
            foundCount += matchCount; // @step:compare
            subarrays.push_back({lookupKey, scanIndex}); // @step:compare
        }

        prefixSumMap[runningSum]++; // @step:visit
    }

    return {foundCount, subarrays}; // @step:complete
}
