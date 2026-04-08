#include "sources/WordPattern.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(wordPattern("abba", "dog cat cat dog") == true);
    assert(wordPattern("abba", "dog cat cat fish") == false);
    assert(wordPattern("aabb", "dog dog cat cat") == true);
    assert(wordPattern("aaaa", "dog cat cat dog") == false);
    assert(wordPattern("abc", "dog cat") == false);
    assert(wordPattern("a", "dog") == true);
    assert(wordPattern("aa", "dog dog") == true);
    assert(wordPattern("ab", "dog dog") == false);
    assert(wordPattern("abcd", "one two three four") == true);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
