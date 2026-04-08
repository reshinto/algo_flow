// Climbing stairs tabulation — count ways to reach the top

#include <iostream>
#include <vector>

int climbingStairsTabulation(int numberOfStairs) {
    // @step:initialize
    if (numberOfStairs <= 1) return 1; // @step:initialize
    std::vector<int> dpTable(numberOfStairs + 1, 0); // @step:initialize,fill-table
    dpTable[0] = 1; // @step:fill-table
    dpTable[1] = 1; // @step:fill-table
    // Each entry is the sum of the ways to arrive from one step below and two steps below
    for (int currentStep = 2; currentStep <= numberOfStairs; currentStep++) {
        // @step:compute-cell
        dpTable[currentStep] = dpTable[currentStep - 1] + dpTable[currentStep - 2]; // @step:compute-cell,read-cache
    }
    return dpTable[numberOfStairs]; // @step:complete
}

#ifndef TESTING
int main() {
    int numberOfStairs = 7;
    int result = climbingStairsTabulation(numberOfStairs);
    std::cout << "Ways to climb " << numberOfStairs << " stairs: " << result << std::endl;
    return 0;
}
#endif
