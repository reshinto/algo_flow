// Partition Equal Subset Sum (Tabulation) — determine if array can be split into two equal-sum subsets

#include <iostream>
#include <vector>
#include <numeric>

bool partitionEqualSubset(const std::vector<int>& numbers) {
    // @step:initialize
    int totalSum = std::accumulate(numbers.begin(), numbers.end(), 0); // @step:initialize
    if (totalSum % 2 != 0) return false; // @step:initialize
    int target = totalSum / 2; // @step:initialize
    int tableSize = target + 1; // @step:initialize
    std::vector<int> dpTable(tableSize, 0); // @step:initialize,fill-table
    dpTable[0] = 1; // @step:fill-table
    // For each number, iterate right-to-left to prevent using it more than once
    for (int currentNumber : numbers) {
        // @step:compute-cell
        for (int sumIndex = target; sumIndex >= currentNumber; sumIndex--) {
            if (dpTable[sumIndex - currentNumber] == 1) {
                // @step:read-cache
                dpTable[sumIndex] = 1; // @step:compute-cell
            }
        }
    }
    return dpTable[target] == 1; // @step:complete
}

int main() {
    std::vector<int> numbers = {1, 5, 11, 5};
    bool result = partitionEqualSubset(numbers);
    std::cout << "Can partition: " << (result ? "true" : "false") << std::endl;
    return 0;
}
