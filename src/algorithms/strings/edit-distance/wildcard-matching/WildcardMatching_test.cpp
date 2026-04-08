/** Correctness tests for the wildcardMatching function. */
#include "sources/WildcardMatching.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(wildcardMatching("adceb", "*a*b") == true);
    assert(wildcardMatching("aa", "a") == false);
    assert(wildcardMatching("aa", "*") == true);
    assert(wildcardMatching("", "") == true);
    assert(wildcardMatching("abc", "a?c") == true);
    assert(wildcardMatching("abc", "a?b") == false);
    assert(wildcardMatching("anylongstring", "*") == true);
    assert(wildcardMatching("", "***") == true);
    assert(wildcardMatching("cb", "?a") == false);
    assert(wildcardMatching("adceb", "*a*") == true);
    assert(wildcardMatching("", "a") == false);
    assert(wildcardMatching("abc", "*bc") == true);
    assert(wildcardMatching("abc", "abc") == true);
    assert(wildcardMatching("abc", "abcd") == false);
    assert(wildcardMatching("a", "?") == true);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
