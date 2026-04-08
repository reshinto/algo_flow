// Min Cost Climbing Stairs memoization — top-down recursion with cached subproblems

#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

int computeMemo(const std::vector<int>& costs, int step, std::unordered_map<int, int>& memo) {
    if (step <= 1) return 0; // @step:initialize
    auto it = memo.find(step);
    if (it != memo.end()) return it->second; // @step:read-cache
    // Recursively compute the minimum cost from each of the two preceding steps, cache to avoid recomputation
    // @step:push-call
    int costFromOne = computeMemo(costs, step - 1, memo) + (step - 1 < (int)costs.size() ? costs[step - 1] : 0); // @step:compute-cell
    int costFromTwo = computeMemo(costs, step - 2, memo) + (step - 2 < (int)costs.size() ? costs[step - 2] : 0); // @step:compute-cell
    int result = std::min(costFromOne, costFromTwo); // @step:compute-cell
    memo[step] = result; // @step:compute-cell
    // @step:pop-call
    return result; // @step:complete
}

int minCostClimbingStairsMemoization(const std::vector<int>& costs) {
    // @step:initialize
    std::unordered_map<int, int> memo; // @step:initialize
    return computeMemo(costs, costs.size(), memo);
}

#ifndef TESTING
int main() {
    std::vector<int> costs = {10, 15, 20};
    int result = minCostClimbingStairsMemoization(costs);
    std::cout << "Min cost to climb: " << result << std::endl;
    return 0;
}
#endif
