#include "sources/LongestSubstringWithoutRepeating.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(longestSubstringWithoutRepeating("abcabcbb") == 3);
    assert(longestSubstringWithoutRepeating("bbbbb") == 1);
    assert(longestSubstringWithoutRepeating("pwwkew") == 3);
    assert(longestSubstringWithoutRepeating("") == 0);
    assert(longestSubstringWithoutRepeating("a") == 1);
    assert(longestSubstringWithoutRepeating("abcde") == 5);
    assert(longestSubstringWithoutRepeating("abba") == 2);
    assert(longestSubstringWithoutRepeating("dvdf") == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
