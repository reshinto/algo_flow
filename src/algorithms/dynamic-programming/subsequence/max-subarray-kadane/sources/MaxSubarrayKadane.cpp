// Maximum Subarray Kadane — build DP table where dp[i] = max subarray sum ending at index i

#include <iostream>
#include <vector>
#include <algorithm>

int maxSubarrayKadane(const std::vector<int>& array) {
    // @step:initialize
    if (array.empty()) return 0; // @step:initialize
    std::vector<int> dpTable(array.size(), 0); // @step:initialize,fill-table
    dpTable[0] = array[0]; // @step:fill-table
    int maxSum = dpTable[0]; // @step:fill-table
    // Each entry: extend the previous subarray or start fresh at current element
    for (int elementIndex = 1; elementIndex < (int)array.size(); elementIndex++) {
        // @step:compute-cell
        dpTable[elementIndex] = std::max(
            array[elementIndex],
            dpTable[elementIndex - 1] + array[elementIndex]
        ); // @step:compute-cell,read-cache
        if (dpTable[elementIndex] > maxSum) {
            // @step:compute-cell
            maxSum = dpTable[elementIndex]; // @step:compute-cell
        }
    }
    return maxSum; // @step:complete
}

int main() {
    std::vector<int> array = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int result = maxSubarrayKadane(array);
    std::cout << "Max subarray sum: " << result << std::endl;
    return 0;
}
