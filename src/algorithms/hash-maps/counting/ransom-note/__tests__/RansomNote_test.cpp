#include "../sources/RansomNote.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(ransomNote("aa", "aab") == true);
    assert(ransomNote("a", "b") == false);
    assert(ransomNote("aa", "ab") == false);
    assert(ransomNote("", "abc") == true);
    assert(ransomNote("", "") == true);
    assert(ransomNote("a", "") == false);
    assert(ransomNote("abc", "aabbcc") == true);
    assert(ransomNote("z", "abcde") == false);
    assert(ransomNote("x", "x") == true);
    assert(ransomNote("aaa", "aaab") == true);
    assert(ransomNote("aaaa", "aaab") == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
