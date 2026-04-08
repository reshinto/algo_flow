// House Robber tabulation — build DP table iteratively from base cases

#include <iostream>
#include <vector>
#include <algorithm>

int houseRobberTabulation(const std::vector<int>& houses) {
    // @step:initialize
    if (houses.empty()) return 0; // @step:initialize
    if (houses.size() == 1) return houses[0]; // @step:initialize,fill-table
    std::vector<int> dpTable(houses.size(), 0); // @step:initialize,fill-table
    dpTable[0] = houses[0]; // @step:fill-table
    dpTable[1] = std::max(houses[0], houses[1]); // @step:fill-table
    // Each entry is max(rob current + dp[i-2], skip current = dp[i-1])
    for (int houseIndex = 2; houseIndex < (int)houses.size(); houseIndex++) {
        // @step:compute-cell
        dpTable[houseIndex] = std::max(
            dpTable[houseIndex - 1],
            dpTable[houseIndex - 2] + houses[houseIndex]
        ); // @step:compute-cell,read-cache
    }
    return dpTable[houses.size() - 1]; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> houses = {2, 7, 9, 3, 1};
    int result = houseRobberTabulation(houses);
    std::cout << "Max rob: " << result << std::endl;
    return 0;
}
#endif
