/** Correctness tests for the validPalindrome function. */
#include "../sources/ValidPalindrome.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(validPalindrome("A man, a plan, a canal: Panama") == true);
    assert(validPalindrome("race a car") == false);
    assert(validPalindrome(" ") == true);
    assert(validPalindrome("a.") == true);
    assert(validPalindrome("") == true);
    assert(validPalindrome("racecar") == true);
    assert(validPalindrome("hello") == false);
    assert(validPalindrome("AbBa") == true);
    assert(validPalindrome(".,!?") == true);
    assert(validPalindrome("...racecar...") == true);
    assert(validPalindrome("ab2a") == false);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
