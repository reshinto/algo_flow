/** Correctness tests for the longestRepeatedSubstring function. */
#include "sources/LongestRepeatedSubstring.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(longestRepeatedSubstring("banana") == "ana");
    assert(longestRepeatedSubstring("abcd") == "");
    assert(longestRepeatedSubstring("aab") == "a");
    assert(longestRepeatedSubstring("a") == "");
    assert(longestRepeatedSubstring("") == "");
    assert(longestRepeatedSubstring("ababc") == "ab");

    std::string aaaResult = longestRepeatedSubstring("aaa");
    assert(!aaaResult.empty() && std::string("aaa").find(aaaResult) != std::string::npos);

    assert(longestRepeatedSubstring("aa") == "a");
    assert(longestRepeatedSubstring("ab") == "");
    assert(longestRepeatedSubstring("abcabc") == "abc");

    std::string msResult = longestRepeatedSubstring("mississippi");
    assert(!msResult.empty());
    std::string ms = "mississippi";
    size_t firstIdx = ms.find(msResult);
    size_t secondIdx = ms.find(msResult, firstIdx + 1);
    assert(secondIdx != std::string::npos);

    assert(longestRepeatedSubstring("121212") == "1212");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
