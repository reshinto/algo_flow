#define TESTING
#include "sources/SetCover.cpp"
#include <cassert>
#include <unordered_set>
#include <iostream>

int main() {
    // covers default universe
    std::vector<std::vector<int>> sets1 = {{1,2,3},{2,4},{3,4,5},{5,6,7},{6,7,8}};
    auto result1 = setCover({1,2,3,4,5,6,7,8}, sets1);
    std::unordered_set<int> covered1;
    for (int idx : result1.selectedIndices) {
        for (int elem : sets1[idx]) covered1.insert(elem);
    }
    assert(covered1.count(1) && covered1.count(8));
    assert(!result1.selectedIndices.empty() && result1.selectedIndices.size() <= 5);

    // single set covers universe
    std::vector<std::vector<int>> sets2 = {{1,2,3},{1},{2}};
    auto result2 = setCover({1,2,3}, sets2);
    assert(result2.selectedIndices.size() == 1);
    assert(result2.selectedIndices[0] == 0);

    // greediest set selected first
    std::vector<std::vector<int>> sets4 = {{1,2,3},{4}};
    auto result4 = setCover({1,2,3,4}, sets4);
    assert(result4.selectedIndices[0] == 0);

    // empty universe returns empty selection
    auto result5 = setCover({}, {{1,2},{3,4}});
    assert(result5.selectedIndices.empty());

    // selected indices match selected sets
    std::vector<std::vector<int>> allSets = {{1,2,3},{2,4},{3,4,5},{5,6,7},{6,7,8}};
    auto result6 = setCover({1,2,3,4,5,6,7,8}, allSets);
    for (size_t pos = 0; pos < result6.selectedIndices.size(); pos++) {
        assert(result6.selectedSets[pos] == allSets[result6.selectedIndices[pos]]);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
