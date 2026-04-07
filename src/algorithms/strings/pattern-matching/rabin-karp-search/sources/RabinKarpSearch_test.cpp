/** Correctness tests for the rabinKarpSearch function. */
#include "RabinKarpSearch.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(rabinKarpSearch("ABCDEF", "ABC") == 0);
    assert(rabinKarpSearch("GEEKS FOR GEEKS", "GEEK") == 0);
    assert(rabinKarpSearch("XYZABC", "ABC") == 3);
    assert(rabinKarpSearch("ABCDEFG", "XYZ") == -1);
    assert(rabinKarpSearch("HELLO", "L") == 2);
    assert(rabinKarpSearch("HELLO", "Z") == -1);
    assert(rabinKarpSearch("HELLO", "") == 0);
    assert(rabinKarpSearch("ABCD", "ABCD") == 0);
    assert(rabinKarpSearch("AB", "ABCD") == -1);
    assert(rabinKarpSearch("AAAAAB", "AAAB") == 2);
    assert(rabinKarpSearch("ABABCABAB", "ABABCABAB") == 0);
    assert(rabinKarpSearch("GEEKS FOR GEEKS", "FOR") == 6);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
