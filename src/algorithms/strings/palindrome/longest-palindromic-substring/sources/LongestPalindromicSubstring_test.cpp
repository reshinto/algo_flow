/** Correctness tests for the longestPalindromicSubstring function. */
#include "LongestPalindromicSubstring.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    std::string bababResult = longestPalindromicSubstring("babad");
    assert(bababResult == "bab" || bababResult == "aba");

    assert(longestPalindromicSubstring("cbbd") == "bb");
    assert(longestPalindromicSubstring("a") == "a");
    assert(longestPalindromicSubstring("") == "");
    assert(longestPalindromicSubstring("racecar") == "racecar");
    assert(longestPalindromicSubstring("abba") == "abba");
    assert(longestPalindromicSubstring("aaaa") == "aaaa");

    std::string uniqueResult = longestPalindromicSubstring("abcde");
    assert(uniqueResult.length() == 1);

    assert(longestPalindromicSubstring("xyzracecarabc") == "racecar");
    assert(longestPalindromicSubstring("xyzabbadef") == "abba");
    assert(longestPalindromicSubstring("aa") == "aa");

    std::string twoCharResult = longestPalindromicSubstring("ab");
    assert(twoCharResult.length() == 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
