/** Correctness tests for the stringCompression function. */
#include "StringCompression.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(stringCompression("aabcccccaaa") == "a2b1c5a3");
    assert(stringCompression("abc") == "abc");
    assert(stringCompression("") == "");
    assert(stringCompression("a") == "a");
    assert(stringCompression("aa") == "aa");
    assert(stringCompression("aaaaaaa") == "a7");
    assert(stringCompression("aaabbbccc") == "a3b3c3");
    assert(stringCompression("abcd") == "abcd");
    assert(stringCompression("aaaaab") == "a5b1");
    assert(stringCompression("aaabbb") == "a3b3");
    assert(stringCompression("abbbbb") == "a1b5");
    assert(stringCompression("1111222") == "1423");
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
