/** Correctness tests for the firstNonRepeatingCharacter function. */
#include "sources/FirstNonRepeatingCharacter.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(firstNonRepeatingCharacter("leetcode") == 0);
    assert(firstNonRepeatingCharacter("loveleetcode") == 2);
    assert(firstNonRepeatingCharacter("aabb") == -1);
    assert(firstNonRepeatingCharacter("z") == 0);
    assert(firstNonRepeatingCharacter("aabbcc") == -1);
    assert(firstNonRepeatingCharacter("aabbc") == 4);
    assert(firstNonRepeatingCharacter("xaabb") == 0);
    assert(firstNonRepeatingCharacter("aabbz") == 4);
    assert(firstNonRepeatingCharacter("aaaa") == -1);
    assert(firstNonRepeatingCharacter("ab") == 0);
    assert(firstNonRepeatingCharacter("dddccdbba") == 8);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
