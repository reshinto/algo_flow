/** Correctness tests for the minimumWindowSubstring function. */
#include "MinimumWindowSubstring.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(minimumWindowSubstring("ADOBECODEBANC", "ABC") == "BANC");
    assert(minimumWindowSubstring("a", "a") == "a");
    assert(minimumWindowSubstring("a", "aa") == "");
    assert(minimumWindowSubstring("hello", "z") == "");
    assert(minimumWindowSubstring("abc", "abc") == "abc");
    assert(minimumWindowSubstring("ab", "abc") == "");
    assert(minimumWindowSubstring("ADOBECODEBANC", "AABC") == "ADOBECODEBA");
    assert(minimumWindowSubstring("cabwefgewcwaefgcf", "cae") == "cwae");
    assert(minimumWindowSubstring("abcdef", "f") == "f");
    assert(minimumWindowSubstring("abc", "") == "");
    assert(minimumWindowSubstring("aaabbbccc", "b") == "b");
    assert(minimumWindowSubstring("abc", "cba") == "abc");
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
