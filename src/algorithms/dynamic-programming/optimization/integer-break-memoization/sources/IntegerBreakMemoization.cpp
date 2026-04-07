// Integer Break memoization — top-down recursion to maximize product of parts

#include <iostream>
#include <unordered_map>
#include <algorithm>

int integerBreakMemoization(int targetNumber, std::unordered_map<int, int>& memo) {
    // @step:initialize
    if (targetNumber == 1) return 1; // @step:initialize
    auto it = memo.find(targetNumber);
    if (it != memo.end()) return it->second; // @step:read-cache
    // @step:push-call
    int maxProduct = 0; // @step:compute-cell
    for (int partSize = 1; partSize < targetNumber; partSize++) {
        // @step:compute-cell
        int remainder = targetNumber - partSize; // @step:compute-cell
        int splitProduct = partSize * remainder; // @step:compute-cell
        int recurseProduct = partSize * integerBreakMemoization(remainder, memo); // @step:compute-cell
        maxProduct = std::max({maxProduct, splitProduct, recurseProduct}); // @step:compute-cell
    }
    memo[targetNumber] = maxProduct; // @step:compute-cell
    return maxProduct; // @step:pop-call
}

int main() {
    std::unordered_map<int, int> memo;
    int targetNumber = 10;
    int result = integerBreakMemoization(targetNumber, memo);
    std::cout << "Integer break(" << targetNumber << "): " << result << std::endl;
    return 0;
}
