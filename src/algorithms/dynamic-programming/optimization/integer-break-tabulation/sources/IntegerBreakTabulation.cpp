// Integer Break tabulation — build DP table iteratively from base cases

#include <iostream>
#include <vector>
#include <algorithm>

int integerBreakTabulation(int targetNumber) {
    // @step:initialize
    std::vector<int> dpTable(targetNumber + 1, 0); // @step:initialize
    dpTable[1] = 1; // @step:fill-table
    // For each i, try every split j + (i - j) and track the best product
    for (int splitIndex = 2; splitIndex <= targetNumber; splitIndex++) {
        // @step:compute-cell
        for (int partIndex = 1; partIndex < splitIndex; partIndex++) {
            // @step:compute-cell,read-cache
            int keepSplit = partIndex * (splitIndex - partIndex); // @step:compute-cell
            int useDp = partIndex * dpTable[splitIndex - partIndex]; // @step:read-cache,compute-cell
            dpTable[splitIndex] = std::max({dpTable[splitIndex], keepSplit, useDp}); // @step:compute-cell
        }
    }
    return dpTable[targetNumber]; // @step:complete
}

#ifndef TESTING
int main() {
    int targetNumber = 10;
    int result = integerBreakTabulation(targetNumber);
    std::cout << "Integer break(" << targetNumber << "): " << result << std::endl;
    return 0;
}
#endif
