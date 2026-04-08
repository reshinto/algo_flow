/** Correctness tests for the longestCommonSubsequence function. */
#include "sources/LongestCommonSubsequence.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(longestCommonSubsequence("ABCBDAB", "BDCAB") == 4);
    assert(longestCommonSubsequence("", "abc") == 0);
    assert(longestCommonSubsequence("abc", "") == 0);
    assert(longestCommonSubsequence("", "") == 0);
    assert(longestCommonSubsequence("abc", "abc") == 3);
    assert(longestCommonSubsequence("abc", "xyz") == 0);
    assert(longestCommonSubsequence("a", "a") == 1);
    assert(longestCommonSubsequence("a", "b") == 0);
    assert(longestCommonSubsequence("AGGTAB", "GXTXAYB") == 4);
    assert(longestCommonSubsequence("ABC", "AC") == 2);
    assert(longestCommonSubsequence("aaa", "aa") == 2);
    assert(longestCommonSubsequence("AB", "B") == 1);
    assert(longestCommonSubsequence("ABCDE", "ACE") == 3);
    assert(longestCommonSubsequence("XMJYAUZ", "MZJAWXU") == 4);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
