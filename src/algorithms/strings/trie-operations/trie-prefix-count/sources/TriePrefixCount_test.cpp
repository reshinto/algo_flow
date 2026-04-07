/** Correctness tests for the triePrefixCount function. */
#include "TriePrefixCount.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert(triePrefixCount({"apple", "app", "apricot", "ape"}, "ap") == 4);
    assert(triePrefixCount({"hello"}, "he") == 1);
    assert(triePrefixCount({}, "a") == 0);
    assert(triePrefixCount({"apple", "app", "apricot"}, "banana") == 0);
    assert(triePrefixCount({"apple", "app", "apricot", "ape"}, "apple") == 1);
    assert(triePrefixCount({"app", "apple", "application"}, "app") == 3);
    assert(triePrefixCount({"app"}, "application") == 0);
    assert(triePrefixCount({"apple", "apple"}, "ap") == 2);
    assert(triePrefixCount({"apple", "ant", "ace"}, "a") == 3);
    assert(triePrefixCount({"cat", "dog", "bird"}, "c") == 1);
    assert(triePrefixCount({"apple", "app"}, "") == 0);
    assert(triePrefixCount({"a", "ab", "abc", "abcd"}, "ab") == 3);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
