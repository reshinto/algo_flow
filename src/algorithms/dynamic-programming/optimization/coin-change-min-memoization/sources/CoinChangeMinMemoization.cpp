// Coin Change Minimum — top-down memoization: find the fewest coins summing to target amount

#include <iostream>
#include <vector>
#include <unordered_map>

int minCoins(int remaining, const std::vector<int>& coins, std::unordered_map<int, int>& memo) {
    if (remaining == 0) {
        // @step:fill-table
        memo[0] = 0; // @step:fill-table
        return 0; // @step:fill-table
    }
    if (remaining < 0) return -1; // @step:fill-table
    auto it = memo.find(remaining);
    if (it != memo.end()) return it->second; // @step:read-cache
    // @step:push-call
    int bestResult = -1;
    for (int coin : coins) {
        // @step:compute-cell
        int subResult = minCoins(remaining - coin, coins, memo); // @step:compute-cell
        if (subResult >= 0) {
            // @step:compute-cell
            int candidate = subResult + 1; // @step:compute-cell
            if (bestResult == -1 || candidate < bestResult) {
                // @step:compute-cell
                bestResult = candidate; // @step:compute-cell
            }
        }
    }
    memo[remaining] = bestResult; // @step:compute-cell
    return bestResult; // @step:pop-call
}

int coinChangeMinMemoization(int amount, const std::vector<int>& coins) {
    // @step:initialize
    std::unordered_map<int, int> memo; // @step:initialize
    return minCoins(amount, coins, memo); // @step:complete
}

#ifndef TESTING
int main() {
    int amount = 11;
    std::vector<int> coins = {1, 5, 6, 9};
    int result = coinChangeMinMemoization(amount, coins);
    std::cout << "Min coins for " << amount << ": " << result << std::endl;
    return 0;
}
#endif
