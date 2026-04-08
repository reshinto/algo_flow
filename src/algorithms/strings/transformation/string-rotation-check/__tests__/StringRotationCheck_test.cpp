/** Correctness tests for the stringRotationCheck function. */
#include "../sources/StringRotationCheck.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(stringRotationCheck("waterbottle", "erbottlewat") == true);
    assert(stringRotationCheck("hello", "hello") == true);
    assert(stringRotationCheck("a", "a") == true);
    assert(stringRotationCheck("a", "b") == false);
    assert(stringRotationCheck("abc", "ab") == false);
    assert(stringRotationCheck("waterbottle", "bottlewater") == true);
    assert(stringRotationCheck("abcde", "abced") == false);
    assert(stringRotationCheck("abcde", "bcdea") == true);
    assert(stringRotationCheck("abcde", "eabcd") == true);
    assert(stringRotationCheck("", "") == true);
    assert(stringRotationCheck("abc", "") == false);
    assert(stringRotationCheck("aabaa", "baaab") == false);
    assert(stringRotationCheck("aab", "baa") == true);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
