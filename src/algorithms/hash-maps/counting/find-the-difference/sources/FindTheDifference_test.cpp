#include "FindTheDifference.cpp"
#include <cassert>
#include <iostream>

int main() {
    // finds 'e' added to "abcd"
    assert(findTheDifference("abcd", "abcde") == 'e');

    // finds added char at start
    assert(findTheDifference("abc", "zabc") == 'z');

    // finds added char when it duplicates an existing one
    assert(findTheDifference("aab", "aabb") == 'b');

    // handles empty original string
    assert(findTheDifference("", "x") == 'x');

    // finds added char in middle position
    assert(findTheDifference("ab", "amb") == 'm');

    // handles single character original
    assert(findTheDifference("a", "ab") == 'b');

    // finds duplicated character in all-same string
    assert(findTheDifference("aaa", "aaaa") == 'a');

    // works with uppercase letters
    assert(findTheDifference("ABC", "ABCD") == 'D');

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
