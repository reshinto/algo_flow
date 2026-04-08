// K-Combinations — Backtracking Generation
// Generates all C(n,k) subsets of exactly k elements from the input array.
// Time: O(k × C(n,k)) — generate C(n,k) combinations, each of length k
// Space: O(k × C(n,k)) — store all combinations

#include <iostream>
#include <vector>

void backtrack(
    std::vector<int>& elements,
    int chooseK,
    int startIdx,
    std::vector<int>& currentSubset,
    std::vector<std::vector<int>>& result
) {
    if ((int)currentSubset.size() == chooseK) {
        result.push_back(currentSubset); // @step:generate-subset
        return;
    }

    for (int elemIdx = startIdx; elemIdx < (int)elements.size(); elemIdx++) {
        currentSubset.push_back(elements[elemIdx]); // @step:initialize
        backtrack(elements, chooseK, elemIdx + 1, currentSubset, result);
        currentSubset.pop_back(); // @step:backtrack
    }
}

std::vector<std::vector<int>> kCombinations(std::vector<int> elements, int chooseK) {
    std::vector<std::vector<int>> result; // @step:initialize
    std::vector<int> currentSubset;       // @step:initialize

    backtrack(elements, chooseK, 0, currentSubset, result); // @step:initialize
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> elements = {1, 2, 3, 4, 5};
    auto result = kCombinations(elements, 3);
    for (auto& subset : result) {
        for (int val : subset) std::cout << val << " ";
        std::cout << "\n";
    }
    return 0;
}
#endif
