// House Robber memoization — top-down recursion with cached subproblems

#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

int rob(const std::vector<int>& houses, int houseIndex, std::unordered_map<int, int>& memo) {
    if (houseIndex == 0) {
        // @step:fill-table
        memo[0] = houses[0]; // @step:fill-table
        return houses[0]; // @step:fill-table
    }
    if (houseIndex == 1) {
        // @step:fill-table
        int baseValue = std::max(houses[0], houses[1]); // @step:fill-table
        memo[1] = baseValue; // @step:fill-table
        return baseValue; // @step:fill-table
    }
    auto it = memo.find(houseIndex);
    if (it != memo.end()) return it->second; // @step:read-cache
    // @step:push-call
    int skipCurrent = rob(houses, houseIndex - 1, memo); // @step:compute-cell
    int robCurrent = rob(houses, houseIndex - 2, memo) + houses[houseIndex]; // @step:compute-cell
    int maxProfit = std::max(skipCurrent, robCurrent); // @step:compute-cell
    memo[houseIndex] = maxProfit; // @step:compute-cell
    return maxProfit; // @step:pop-call
}

int houseRobberMemoization(const std::vector<int>& houses) {
    // @step:initialize
    if (houses.empty()) return 0; // @step:initialize
    if (houses.size() == 1) return houses[0]; // @step:initialize
    std::unordered_map<int, int> memo;
    return rob(houses, houses.size() - 1, memo); // @step:complete
}

int main() {
    std::vector<int> houses = {2, 7, 9, 3, 1};
    int result = houseRobberMemoization(houses);
    std::cout << "Max rob: " << result << std::endl;
    return 0;
}
