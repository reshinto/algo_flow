// Power Set — Backtracking Generation
// Generates all 2^n subsets of the input elements by choosing to include or exclude each element.
// Time: O(n × 2^n) — generate 2^n subsets, each of length up to n
// Space: O(n × 2^n) — store all subsets

#include <iostream>
#include <vector>

void backtrack(
    std::vector<int>& elements,
    int startIdx,
    std::vector<int>& currentSubset,
    std::vector<std::vector<int>>& result
) {
    result.push_back(currentSubset); // @step:generate-subset

    for (int elemIdx = startIdx; elemIdx < (int)elements.size(); elemIdx++) {
        currentSubset.push_back(elements[elemIdx]); // @step:initialize
        backtrack(elements, elemIdx + 1, currentSubset, result); // recurse with next element
        currentSubset.pop_back(); // @step:backtrack
    }
}

std::vector<std::vector<int>> powerSet(std::vector<int> elements) {
    std::vector<std::vector<int>> result; // @step:initialize
    std::vector<int> currentSubset;       // @step:initialize

    backtrack(elements, 0, currentSubset, result); // @step:initialize
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> elements = {1, 2, 3};
    auto result = powerSet(elements);
    for (auto& subset : result) {
        std::cout << "[";
        for (int val : subset) std::cout << val << " ";
        std::cout << "]\n";
    }
    return 0;
}
#endif
