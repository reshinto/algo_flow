#include "sources/ValidAnagram.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(validAnagram("anagram", "nagaram") == true);
    assert(validAnagram("rat", "car") == false);
    assert(validAnagram("ab", "abc") == false);
    assert(validAnagram("a", "a") == true);
    assert(validAnagram("a", "b") == false);
    assert(validAnagram("", "") == true);
    assert(validAnagram("listen", "listen") == true);
    assert(validAnagram("listen", "silent") == true);
    assert(validAnagram("aab", "aaa") == false);
    assert(validAnagram("Aa", "aa") == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
