#define TESTING
#include "../sources/KCombinations.cpp"
#include <cassert>
#include <algorithm>
#include <set>
#include <string>
#include <iostream>

int main() {
    // C(5,3) = 10
    auto result1 = kCombinations({1, 2, 3, 4, 5}, 3);
    assert(result1.size() == 10);

    // every subset has exactly k elements
    for (const auto& subset : result1) {
        assert(subset.size() == 3);
    }

    // C(4,2) = 6
    auto result2 = kCombinations({1, 2, 3, 4}, 2);
    assert(result2.size() == 6);

    // k equals n — full set, exactly 1 result
    auto result3 = kCombinations({1, 2, 3}, 3);
    assert(result3.size() == 1);

    // k = 0 returns one empty subset
    auto result4 = kCombinations({1, 2, 3}, 0);
    assert(result4.size() == 1);
    assert(result4[0].empty());

    // k exceeds n — no combinations
    auto result5 = kCombinations({1, 2}, 5);
    assert(result5.empty());

    // empty input with positive k
    auto result6 = kCombinations({}, 2);
    assert(result6.empty());

    // no duplicate combinations
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
