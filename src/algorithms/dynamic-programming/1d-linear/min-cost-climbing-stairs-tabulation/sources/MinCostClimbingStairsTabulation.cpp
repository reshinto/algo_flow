// Min Cost Climbing Stairs tabulation — minimum cost to reach the top

#include <iostream>
#include <vector>
#include <algorithm>

int minCostClimbingStairsTabulation(const std::vector<int>& costs) {
    // @step:initialize
    int stairCount = costs.size(); // @step:initialize
    if (stairCount == 0) return 0; // @step:initialize
    std::vector<int> dpTable(stairCount + 1, 0); // @step:initialize,fill-table
    dpTable[0] = 0; // @step:fill-table
    dpTable[1] = 0; // @step:fill-table
    // Each entry is the minimum cost to reach that step from either one or two steps below
    for (int currentStep = 2; currentStep <= stairCount; currentStep++) {
        // @step:compute-cell
        dpTable[currentStep] = std::min(
            dpTable[currentStep - 1] + costs[currentStep - 1], // @step:compute-cell,read-cache
            dpTable[currentStep - 2] + costs[currentStep - 2]  // @step:compute-cell,read-cache
        );
    }
    return dpTable[stairCount]; // @step:complete
}

int main() {
    std::vector<int> costs = {10, 15, 20};
    int result = minCostClimbingStairsTabulation(costs);
    std::cout << "Min cost to climb: " << result << std::endl;
    return 0;
}
