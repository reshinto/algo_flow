#include "FirstUniqueCharacter.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(firstUniqueCharacter("leetcode") == 0);
    assert(firstUniqueCharacter("loveleetcode") == 2);
    assert(firstUniqueCharacter("aabb") == -1);
    assert(firstUniqueCharacter("z") == 0);
    assert(firstUniqueCharacter("aabbcc") == -1);
    assert(firstUniqueCharacter("aabc") == 2);
    assert(firstUniqueCharacter("abcde") == 0);
    assert(firstUniqueCharacter("abab") == -1);
    assert(firstUniqueCharacter("aadadaad") == -1);
    assert(firstUniqueCharacter("aba") == 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
