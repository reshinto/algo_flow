// Rod Cutting (Tabulation) — find maximum revenue from cutting a rod of length n

#include <iostream>
#include <vector>

int rodCutting(const std::vector<int>& prices) {
    // @step:initialize
    int rodLength = prices.size(); // @step:initialize
    std::vector<int> dpTable(rodLength + 1, 0); // @step:initialize,fill-table
    // dp[0] = 0 (base case: zero revenue for zero-length rod)
    for (int currentLength = 1; currentLength <= rodLength; currentLength++) {
        // @step:compute-cell
        for (int cutLength = 1; cutLength <= currentLength; cutLength++) {
            // @step:read-cache
            int remainder = currentLength - cutLength; // @step:read-cache
            int candidate = prices[cutLength - 1] + dpTable[remainder]; // @step:read-cache
            if (candidate > dpTable[currentLength]) {
                dpTable[currentLength] = candidate; // @step:compute-cell
            }
        }
    }
    return dpTable[rodLength]; // @step:complete
}

int main() {
    std::vector<int> prices = {1, 5, 8, 9, 10, 17, 17, 20};
    int result = rodCutting(prices);
    std::cout << "Max rod cutting revenue: " << result << std::endl;
    return 0;
}
