#include "ReorganizeString.cpp"
#include <cassert>
#include <string>
#include <iostream>

bool hasAdjacentDuplicates(const std::string& str) {
    for (int idx = 1; idx < (int)str.size(); idx++) {
        if (str[idx] == str[idx - 1]) return true;
    }
    return false;
}

int main() {
    // Test: "aabbc" — valid reorganization
    std::string result1 = reorganizeString("aabbc");
    assert(result1.size() == 5);
    assert(!hasAdjacentDuplicates(result1));

    // Test: "aaab" — impossible
    assert(reorganizeString("aaab") == "");

    // Test: single character
    assert(reorganizeString("a") == "a");

    // Test: two different characters
    std::string result4 = reorganizeString("ab");
    assert(result4.size() == 2);
    assert(!hasAdjacentDuplicates(result4));

    // Test: "aab"
    std::string result5 = reorganizeString("aab");
    assert(result5.size() == 3);
    assert(!hasAdjacentDuplicates(result5));

    // Test: "aaa" — impossible
    assert(reorganizeString("aaa") == "");

    // Test: "aa" — impossible
    assert(reorganizeString("aa") == "");

    // Test: all unique "abcde"
    std::string result8 = reorganizeString("abcde");
    assert(result8.size() == 5);
    assert(!hasAdjacentDuplicates(result8));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
