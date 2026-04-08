#define TESTING
#include "sources/PowerSet.cpp"
#include <cassert>
#include <algorithm>
#include <set>
#include <string>
#include <iostream>

int main() {
    // generates 2^4 = 16 subsets
    auto result1 = powerSet({1, 2, 3, 4});
    assert(result1.size() == 16);

    // includes the empty set
    bool hasEmpty = false;
    for (const auto& subset : result1) {
        if (subset.empty()) { hasEmpty = true; break; }
    }
    assert(hasEmpty);

    // includes the full set
    bool hasFull = false;
    for (auto subset : result1) {
        std::sort(subset.begin(), subset.end());
        if (subset == std::vector<int>{1, 2, 3, 4}) { hasFull = true; break; }
    }
    assert(hasFull);

    // empty input returns one empty subset
    auto result2 = powerSet({});
    assert(result2.size() == 1);
    assert(result2[0].empty());

    // single element returns 2 subsets
    auto result3 = powerSet({7});
    assert(result3.size() == 2);

    // three elements returns 8 subsets
    auto result4 = powerSet({1, 2, 3});
    assert(result4.size() == 8);

    // no duplicate subsets
    std::set<std::string> uniqueSubsets;
    for (auto subset : result1) {
        std::sort(subset.begin(), subset.end());
        std::string key;
        for (int val : subset) key += std::to_string(val) + ",";
        uniqueSubsets.insert(key);
    }
    assert(uniqueSubsets.size() == result1.size());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
