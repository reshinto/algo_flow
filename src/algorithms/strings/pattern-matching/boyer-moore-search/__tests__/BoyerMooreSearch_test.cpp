/** Correctness tests for the boyerMooreSearch function. */
#include "../sources/BoyerMooreSearch.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(boyerMooreSearch("ABCDEF", "ABC") == 0);
    assert(boyerMooreSearch("ABAAABCD", "ABC") == 4);
    assert(boyerMooreSearch("XYZABC", "ABC") == 3);
    assert(boyerMooreSearch("ABCDEFG", "XYZ") == -1);
    assert(boyerMooreSearch("HELLO", "L") == 2);
    assert(boyerMooreSearch("HELLO", "Z") == -1);
    assert(boyerMooreSearch("HELLO", "") == 0);
    assert(boyerMooreSearch("ABCD", "ABCD") == 0);
    assert(boyerMooreSearch("AB", "ABCD") == -1);
    assert(boyerMooreSearch("AAAAABCD", "ABCD") == 4);
    assert(boyerMooreSearch("GCATCGCAGAGAGTATACAGTACG", "GCAGAGAG") == 5);
    assert(boyerMooreSearch("ABCDEFGHIJK", "DEF") == 3);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
