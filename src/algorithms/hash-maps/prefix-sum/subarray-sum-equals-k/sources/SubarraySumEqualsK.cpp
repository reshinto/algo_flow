// Subarray Sum Equals K — count subarrays whose elements sum to the target using prefix sums and a hash map
#include <vector>
#include <unordered_map>

int subarraySumEqualsK(const std::vector<int>& numbers, int target) {
    std::unordered_map<int, int> prefixCounts; // @step:initialize
    prefixCounts[0] = 1; // @step:initialize
    int currentSum = 0;
    int totalCount = 0;
    for (int num : numbers) {
        currentSum += num; // @step:check-prefix
        int needed = currentSum - target; // @step:check-prefix
        auto it = prefixCounts.find(needed);
        if (it != prefixCounts.end()) {
            // @step:prefix-found
            totalCount += it->second; // @step:prefix-found
        }
        // Store the running prefix sum count for future lookups
        prefixCounts[currentSum]++; // @step:increment-count
    }
    return totalCount; // @step:complete
}
