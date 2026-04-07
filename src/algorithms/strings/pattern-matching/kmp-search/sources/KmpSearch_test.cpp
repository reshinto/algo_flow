/** Correctness tests for the kmpSearch function. */
#include "KmpSearch.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(kmpSearch("ABCDEF", "ABC") == 0);
    assert(kmpSearch("ABABDABACDABABCABAB", "ABABCABAB") == 10);
    assert(kmpSearch("XYZABC", "ABC") == 3);
    assert(kmpSearch("ABCDEFG", "XYZ") == -1);
    assert(kmpSearch("HELLO", "L") == 2);
    assert(kmpSearch("HELLO", "Z") == -1);
    assert(kmpSearch("HELLO", "") == 0);
    assert(kmpSearch("ABCD", "ABCD") == 0);
    assert(kmpSearch("AB", "ABCD") == -1);
    assert(kmpSearch("AAAAAB", "AAAB") == 2);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
