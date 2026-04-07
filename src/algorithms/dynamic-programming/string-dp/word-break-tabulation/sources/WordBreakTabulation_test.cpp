// g++ -o test WordBreakTabulation_test.cpp && ./test
#include "WordBreakTabulation.cpp"
#include <cassert>
#include <iostream>
#include <string>
#include <vector>

int main() {
    assert(wordBreakTabulation("leetcode", {"leet", "code"}) == true);
    assert(wordBreakTabulation("applepenapple", {"apple", "pen"}) == true);
    assert(wordBreakTabulation("catsandog", {"cats", "dog", "sand", "and", "cat"}) == false);
    assert(wordBreakTabulation("", {"a"}) == true);
    assert(wordBreakTabulation("catsanddog", {"cats", "dog", "sand", "and", "cat"}) == true);
    assert(wordBreakTabulation("hello", {"world", "foo"}) == false);
    assert(wordBreakTabulation("apple", {"apple", "pen"}) == true);
    assert(wordBreakTabulation("leetcoderr", {"leet", "code"}) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
