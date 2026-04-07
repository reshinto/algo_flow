/** Correctness tests for the naivePatternSearch function. */
#include "NaivePatternSearch.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(naivePatternSearch("ABCDEF", "ABC") == 0);
    assert(naivePatternSearch("AABAACAADAABAABA", "AABA") == 0);
    assert(naivePatternSearch("XYZABC", "ABC") == 3);
    assert(naivePatternSearch("ABCDEFG", "XYZ") == -1);
    assert(naivePatternSearch("HELLO", "L") == 2);
    assert(naivePatternSearch("HELLO", "Z") == -1);
    assert(naivePatternSearch("HELLO", "") == 0);
    assert(naivePatternSearch("ABCD", "ABCD") == 0);
    assert(naivePatternSearch("AB", "ABCD") == -1);
    assert(naivePatternSearch("AAAAAB", "AAAB") == 2);
    assert(naivePatternSearch("AAAAAAB", "AAAAB") == 2);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
