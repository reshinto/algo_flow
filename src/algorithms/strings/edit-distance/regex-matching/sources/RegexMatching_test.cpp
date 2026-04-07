/** Correctness tests for the regexMatching function. */
#include "RegexMatching.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(regexMatching("aab", "c*a*b") == true);
    assert(regexMatching("aa", "a") == false);
    assert(regexMatching("ab", ".*") == true);
    assert(regexMatching("", "") == true);
    assert(regexMatching("aa", "a*") == true);
    assert(regexMatching("aa", ".*") == true);
    assert(regexMatching("aab", "c*a*") == false);
    assert(regexMatching("mississippi", "mis*is*p*.") == false);
    assert(regexMatching("ab", ".*c") == false);
    assert(regexMatching("a", ".") == true);
    assert(regexMatching("b", "a") == false);
    assert(regexMatching("", "a*") == true);
    assert(regexMatching("aaa", "a*a") == true);
    assert(regexMatching("abc", "a.c") == true);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
