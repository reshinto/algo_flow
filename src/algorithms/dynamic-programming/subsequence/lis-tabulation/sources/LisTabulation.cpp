// LIS tabulation — O(n^2) bottom-up DP for longest increasing subsequence length

#include <iostream>
#include <vector>
#include <algorithm>

int lisLength(const std::vector<int>& sequence) {
    // @step:initialize
    int sequenceLength = sequence.size(); // @step:initialize
    if (sequenceLength == 0) return 0; // @step:initialize
    std::vector<int> dpTable(sequenceLength, 1); // @step:initialize,fill-table
    // Each element is a subsequence of length 1
    int maxLength = 1; // @step:fill-table
    // For each index, scan all previous indices
    for (int outerIndex = 1; outerIndex < sequenceLength; outerIndex++) {
        // @step:compute-cell
        for (int innerIndex = 0; innerIndex < outerIndex; innerIndex++) {
            // @step:read-cache
            if (sequence[innerIndex] < sequence[outerIndex]) {
                // @step:read-cache
                dpTable[outerIndex] = std::max(dpTable[outerIndex], dpTable[innerIndex] + 1); // @step:compute-cell,read-cache
            }
        }
        if (dpTable[outerIndex] > maxLength) {
            // @step:compute-cell
            maxLength = dpTable[outerIndex]; // @step:compute-cell
        }
    }
    return maxLength; // @step:complete
}

int main() {
    std::vector<int> sequence = {10, 9, 2, 5, 3, 7, 101, 18};
    int result = lisLength(sequence);
    std::cout << "LIS length: " << result << std::endl;
    return 0;
}
