// Coin Change (Min Coins) tabulation — find minimum coins needed to make amount

#include <iostream>
#include <vector>
#include <climits>

int coinChangeMinTabulation(int amount, const std::vector<int>& coins) {
    // @step:initialize
    int tableSize = amount + 1; // @step:initialize
    std::vector<int> dpTable(tableSize, INT_MAX); // @step:initialize,fill-table
    dpTable[0] = 0; // @step:fill-table
    // For each amount, try every coin and take the minimum
    for (int currentAmount = 1; currentAmount <= amount; currentAmount++) {
        // @step:compute-cell
        for (int coin : coins) {
            if (currentAmount >= coin && dpTable[currentAmount - coin] != INT_MAX) {
                // @step:read-cache
                int candidate = dpTable[currentAmount - coin] + 1; // @step:read-cache
                if (candidate < dpTable[currentAmount]) {
                    dpTable[currentAmount] = candidate; // @step:compute-cell
                }
            }
        }
    }
    return dpTable[amount] == INT_MAX ? -1 : dpTable[amount]; // @step:complete
}

#ifndef TESTING
int main() {
    int amount = 11;
    std::vector<int> coins = {1, 5, 6, 9};
    int result = coinChangeMinTabulation(amount, coins);
    std::cout << "Min coins for " << amount << ": " << result << std::endl;
    return 0;
}
#endif
