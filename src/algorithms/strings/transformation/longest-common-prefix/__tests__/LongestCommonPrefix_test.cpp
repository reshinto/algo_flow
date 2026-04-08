/** Correctness tests for the longestCommonPrefix function. */
#include "../sources/LongestCommonPrefix.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert(longestCommonPrefix({"flower", "flow", "flight"}) == "fl");
    assert(longestCommonPrefix({"dog", "racecar", "car"}) == "");
    assert(longestCommonPrefix({""}) == "");
    assert(longestCommonPrefix({"hello"}) == "hello");
    assert(longestCommonPrefix({}) == "");
    assert(longestCommonPrefix({"abc", ""}) == "");
    assert(longestCommonPrefix({"abc", "abc", "abc"}) == "abc");
    assert(longestCommonPrefix({"ab", "abc", "abcd"}) == "ab");
    assert(longestCommonPrefix({"ab", "a"}) == "a");
    assert(longestCommonPrefix({"interview", "internal"}) == "inter");
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
