// Coin Change Ways (Tabulation) — count distinct ways to make each amount using given coins

#include <iostream>
#include <vector>

long long coinChangeWays(int amount, const std::vector<int>& coins) {
    // @step:initialize
    std::vector<long long> dpTable(amount + 1, 0); // @step:initialize,fill-table
    dpTable[0] = 1; // @step:fill-table
    // Outer loop over coins — ordering ensures we count combinations, not permutations
    for (int coin : coins) {
        // @step:compute-cell
        for (int currentAmount = coin; currentAmount <= amount; currentAmount++) {
            // @step:compute-cell
            dpTable[currentAmount] += dpTable[currentAmount - coin]; // @step:compute-cell,read-cache
        }
    }
    return dpTable[amount]; // @step:complete
}

#ifndef TESTING
int main() {
    int amount = 5;
    std::vector<int> coins = {1, 2, 5};
    long long result = coinChangeWays(amount, coins);
    std::cout << "Ways to make " << amount << ": " << result << std::endl;
    return 0;
}
#endif
