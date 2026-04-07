// Set Permutations
// Generates all n! orderings of a set using backtracking with in-place swaps.
// Time: O(n × n!) — n! permutations each of length n
// Space: O(n × n!) for the result, O(n) call stack depth

#include <iostream>
#include <vector>
#include <algorithm>

void permute(std::vector<int>& working, int startIdx, std::vector<std::vector<int>>& result) {
    if (startIdx == (int)working.size()) {
        result.push_back(working); // @step:generate-permutation
        return;
    }

    for (int swapIdx = startIdx; swapIdx < (int)working.size(); swapIdx++) {
        // Swap elements[startIdx] with elements[swapIdx]
        std::swap(working[startIdx], working[swapIdx]); // @step:backtrack
        permute(working, startIdx + 1, result);
        // Restore original order
        std::swap(working[startIdx], working[swapIdx]); // @step:backtrack
    }
}

std::vector<std::vector<int>> setPermutations(std::vector<int> elements) {
    std::vector<std::vector<int>> result; // @step:initialize
    std::vector<int> working = elements;  // @step:initialize

    permute(working, 0, result);
    return result; // @step:complete
}

int main() {
    std::vector<int> elements = {1, 2, 3};
    auto result = setPermutations(elements);
    for (auto& perm : result) {
        for (int val : perm) std::cout << val << " ";
        std::cout << "\n";
    }
    return 0;
}
