// Minimum Jumps tabulation — build DP table iteratively from base case

#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>

int minimumJumps(const std::vector<int>& jumps) {
    // @step:initialize
    int arrayLength = jumps.size(); // @step:initialize
    if (arrayLength == 0) return 0; // @step:initialize
    std::vector<int> dpTable(arrayLength, INT_MAX); // @step:initialize,fill-table
    dpTable[0] = 0; // @step:fill-table
    // For each position, check all prior positions that can reach it
    for (int targetIndex = 1; targetIndex < arrayLength; targetIndex++) {
        // @step:compute-cell
        for (int sourceIndex = 0; sourceIndex < targetIndex; sourceIndex++) {
            // @step:read-cache
            if (dpTable[sourceIndex] != INT_MAX
                && sourceIndex + jumps[sourceIndex] >= targetIndex) {
                // @step:read-cache
                int candidate = dpTable[sourceIndex] + 1;
                if (candidate < dpTable[targetIndex]) {
                    dpTable[targetIndex] = candidate; // @step:compute-cell,read-cache
                }
            }
        }
    }
    return dpTable[arrayLength - 1] == INT_MAX ? -1 : dpTable[arrayLength - 1]; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> jumps = {2, 3, 1, 1, 4};
    int result = minimumJumps(jumps);
    std::cout << "Minimum jumps: " << result << std::endl;
    return 0;
}
#endif
