/** Correctness tests for the zAlgorithm function. */
#include "../sources/ZAlgorithm.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(zAlgorithm("ABCDEF", "ABC") == 0);
    assert(zAlgorithm("AABXAABXCAABXAABXAY", "AABXAAB") == 0);
    assert(zAlgorithm("XYZAABXAAB", "AABXAAB") == 3);
    assert(zAlgorithm("XYZABC", "ABC") == 3);
    assert(zAlgorithm("ABCDEFG", "XYZ") == -1);
    assert(zAlgorithm("HELLO", "L") == 2);
    assert(zAlgorithm("HELLO", "Z") == -1);
    assert(zAlgorithm("HELLO", "") == 0);
    assert(zAlgorithm("ABCD", "ABCD") == 0);
    assert(zAlgorithm("AB", "ABCD") == -1);
    assert(zAlgorithm("AAAAAB", "AAAB") == 2);
    assert(zAlgorithm("ABABABAB", "ABAB") == 0);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
