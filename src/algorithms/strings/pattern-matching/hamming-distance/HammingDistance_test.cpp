/** Correctness tests for the hammingDistance function. */
#include "sources/HammingDistance.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(hammingDistance("karolin", "kathrin") == 3);
    assert(hammingDistance("abcdef", "abcdef") == 0);
    assert(hammingDistance("aaaa", "bbbb") == 4);
    assert(hammingDistance("hello", "hxllo") == 1);
    assert(hammingDistance("abc", "abcd") == -1);
    assert(hammingDistance("abcde", "abc") == -1);
    assert(hammingDistance("a", "a") == 0);
    assert(hammingDistance("a", "b") == 1);
    assert(hammingDistance("", "") == 0);
    assert(hammingDistance("1011101", "1001001") == 2);
    assert(hammingDistance("TONED", "ROSES") == 3);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
