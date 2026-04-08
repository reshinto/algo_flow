/** Correctness tests for the levenshteinDistance function. */
#include "sources/LevenshteinDistance.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(levenshteinDistance("kitten", "sitting") == 3);
    assert(levenshteinDistance("", "abc") == 3);
    assert(levenshteinDistance("abc", "") == 3);
    assert(levenshteinDistance("abc", "abc") == 0);
    assert(levenshteinDistance("", "") == 0);
    assert(levenshteinDistance("cat", "cats") == 1);
    assert(levenshteinDistance("cats", "cat") == 1);
    assert(levenshteinDistance("cat", "bat") == 1);
    assert(levenshteinDistance("abc", "xyz") == 3);
    assert(levenshteinDistance("sunday", "saturday") == 3);
    assert(levenshteinDistance("a", "a") == 0);
    assert(levenshteinDistance("a", "b") == 1);
    assert(levenshteinDistance("aaa", "aa") == 1);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
