// Greedy Set Cover approximation
// Finds the minimum number of subsets that cover all elements of the universe.
// Time: O(n × m) where n = |universe|, m = |sets|
// Space: O(n + m) for the uncovered set and selected sets tracking

#include <iostream>
#include <vector>
#include <unordered_set>
#include <algorithm>

struct SetCoverResult {
    std::vector<int> selectedIndices;
    std::vector<std::vector<int>> selectedSets;
};

SetCoverResult setCover(std::vector<int> universe, std::vector<std::vector<int>> sets) {
    std::unordered_set<int> uncovered(universe.begin(), universe.end()); // @step:initialize
    std::vector<int> selectedIndices;
    std::vector<std::vector<int>> selectedSets;

    while (!uncovered.empty()) {
        // @step:evaluate-set
        int bestSetIdx = -1;
        int bestCoverage = 0;

        for (int setIdx = 0; setIdx < (int)sets.size(); setIdx++) {
            const auto& candidateSet = sets[setIdx];
            int coverage = (int)std::count_if(candidateSet.begin(), candidateSet.end(),
                [&](int elem) { return uncovered.count(elem) > 0; }); // @step:evaluate-set
            if (coverage > bestCoverage) {
                bestCoverage = coverage;
                bestSetIdx = setIdx;
            }
        }

        if (bestSetIdx == -1) break;

        const auto& chosenSet = sets[bestSetIdx];
        selectedIndices.push_back(bestSetIdx); // @step:select-set
        selectedSets.push_back(chosenSet);

        for (int element : chosenSet) {
            uncovered.erase(element); // @step:cover-elements
        }
    }

    return {selectedIndices, selectedSets}; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> universe = {1, 2, 3, 4, 5};
    std::vector<std::vector<int>> sets = {{1, 2, 3}, {2, 4}, {3, 4, 5}, {4, 5}};
    auto result = setCover(universe, sets);
    std::cout << "Selected indices: ";
    for (int idx : result.selectedIndices) std::cout << idx << " ";
    std::cout << "\n";
    return 0;
}
#endif
