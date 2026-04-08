#include "sources/FindAllAnagrams.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    assert((findAllAnagrams("cbaebabacd", "abc") == std::vector<int>{0, 6}));
    assert((findAllAnagrams("abab", "ab") == std::vector<int>{0, 1, 2}));
    assert(findAllAnagrams("af", "be").empty());
    assert((findAllAnagrams("cba", "abc") == std::vector<int>{0}));
    assert((findAllAnagrams("aaab", "a") == std::vector<int>{0, 1, 2}));
    assert(findAllAnagrams("ab", "abc").empty());
    assert(findAllAnagrams("aabbcc", "bca").empty());

    std::vector<int> result = findAllAnagrams("aababb", "aab");
    assert(std::find(result.begin(), result.end(), 0) != result.end());
    assert(std::find(result.begin(), result.end(), 1) != result.end());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
