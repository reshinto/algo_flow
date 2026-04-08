/** Correctness tests for the palindromeCheck function. */
#include "sources/PalindromeCheck.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(palindromeCheck("racecar") == true);
    assert(palindromeCheck("hello") == false);
    assert(palindromeCheck("a") == true);
    assert(palindromeCheck("") == true);
    assert(palindromeCheck("ab") == false);
    assert(palindromeCheck("aba") == true);
    assert(palindromeCheck("abba") == true);
    assert(palindromeCheck("abca") == false);
    assert(palindromeCheck("aaaa") == true);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
