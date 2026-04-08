/** Correctness tests for the longestWordInTrie function. */
#include "../sources/LongestWordInTrie.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert(longestWordInTrie({"w", "wo", "wor", "worl", "world"}) == "world");
    assert(longestWordInTrie({}) == "");
    assert(longestWordInTrie({"a"}) == "a");
    assert(longestWordInTrie({"world"}) == "");
    assert(longestWordInTrie({"a", "ap", "app", "appl", "apple"}) == "apple");
    assert(longestWordInTrie({"b", "ba", "c", "ca"}) == "ba");
    assert(longestWordInTrie({"d", "dog"}) == "d");
    assert(longestWordInTrie({"abc", "def", "ghi"}) == "");
    assert(longestWordInTrie({"a", "ab", "abc", "x", "xy"}) == "abc");
    assert(longestWordInTrie({"a", "a", "ab", "ab"}) == "ab");
    assert(longestWordInTrie({"b", "c"}) == "b");
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
