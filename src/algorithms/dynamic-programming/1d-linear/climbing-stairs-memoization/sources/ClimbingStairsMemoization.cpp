// Climbing stairs memoization — top-down recursion with cached subproblems

#include <iostream>
#include <unordered_map>

int climbingStairsMemoization(int numberOfStairs, std::unordered_map<int, int>& memo) {
    // @step:initialize
    if (numberOfStairs <= 1) return 1; // @step:initialize
    auto it = memo.find(numberOfStairs);
    if (it != memo.end()) return it->second; // @step:read-cache
    // Recursively count distinct ways from the previous two steps, cache to avoid recomputation
    // @step:push-call
    int result = climbingStairsMemoization(numberOfStairs - 1, memo) // @step:compute-cell
               + climbingStairsMemoization(numberOfStairs - 2, memo); // @step:compute-cell
    memo[numberOfStairs] = result; // @step:compute-cell
    // @step:pop-call
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::unordered_map<int, int> memo;
    int numberOfStairs = 7;
    int result = climbingStairsMemoization(numberOfStairs, memo);
    std::cout << "Ways to climb " << numberOfStairs << " stairs: " << result << std::endl;
    return 0;
}
#endif
