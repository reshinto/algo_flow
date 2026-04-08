#define TESTING
#include "../sources/SetPermutations.cpp"
#include <cassert>
#include <algorithm>
#include <set>
#include <string>
#include <iostream>

int main() {
    // generates 6 permutations for [1, 2, 3]
    auto result1 = setPermutations({1, 2, 3});
    assert(result1.size() == 6);

    // contains all expected permutations
    std::set<std::string> permSet;
    for (const auto& perm : result1) {
        std::string key;
        for (int val : perm) key += std::to_string(val) + ",";
        permSet.insert(key);
    }
    assert(permSet.count("1,2,3,"));
    assert(permSet.count("1,3,2,"));
    assert(permSet.count("2,1,3,"));
    assert(permSet.count("2,3,1,"));
    assert(permSet.count("3,1,2,"));
    assert(permSet.count("3,2,1,"));

    // two elements generates two permutations
    auto result2 = setPermutations({1, 2});
    assert(result2.size() == 2);

    // single element generates one permutation
    auto result3 = setPermutations({42});
    assert(result3.size() == 1);
    assert(result3[0][0] == 42);

    // empty array generates one permutation
    auto result4 = setPermutations({});
    assert(result4.size() == 1);
    assert(result4[0].empty());

    // each permutation has same length as input
    for (const auto& perm : result1) {
        assert(perm.size() == 3);
    }

    // 24 permutations for 4 elements
    auto result5 = setPermutations({1, 2, 3, 4});
    assert(result5.size() == 24);

    // all permutations are distinct
    std::set<std::string> uniquePerms;
    for (const auto& perm : result1) {
        std::string key;
        for (int val : perm) key += std::to_string(val) + ",";
        uniquePerms.insert(key);
    }
    assert(uniquePerms.size() == result1.size());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
