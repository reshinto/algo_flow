/** Correctness tests for the longestCommonSubstring function. */
#include "LongestCommonSubstring.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(longestCommonSubstring("ABABC", "BABCBA") == 4);
    assert(longestCommonSubstring("", "abc") == 0);
    assert(longestCommonSubstring("abc", "") == 0);
    assert(longestCommonSubstring("", "") == 0);
    assert(longestCommonSubstring("abc", "abc") == 3);
    assert(longestCommonSubstring("abc", "xyz") == 0);
    assert(longestCommonSubstring("abc", "xbz") == 1);
    assert(longestCommonSubstring("a", "a") == 1);
    assert(longestCommonSubstring("a", "b") == 0);
    assert(longestCommonSubstring("abcdef", "abcxyz") == 3);
    assert(longestCommonSubstring("xyzabc", "defabc") == 3);
    assert(longestCommonSubstring("abXYZcd", "abXYcd") == 4);
    assert(longestCommonSubstring("aaaa", "aa") == 2);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
