// g++ -o test WordBreakMemoization_test.cpp && ./test
#include "WordBreakMemoization.cpp"
#include <cassert>
#include <iostream>
#include <string>
#include <vector>

int main() {
    assert(wordBreakMemoization("leetcode", {"leet", "code"}) == true);
    assert(wordBreakMemoization("catsandog", {"cats", "dog", "sand", "and", "cat"}) == false);
    assert(wordBreakMemoization("", {"leet", "code"}) == true);
    assert(wordBreakMemoization("leet", {"leet", "code"}) == true);
    assert(wordBreakMemoization("abcd", {"leet", "code"}) == false);
    assert(wordBreakMemoization("applepenapple", {"apple", "pen"}) == true);
    assert(wordBreakMemoization("catsanddog", {"cat", "cats", "and", "sand", "dog"}) == true);
    assert(wordBreakMemoization("aaaaab", {"a", "aa", "aaa", "aaaa"}) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
