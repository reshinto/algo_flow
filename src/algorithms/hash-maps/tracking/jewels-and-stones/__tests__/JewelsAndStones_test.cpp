#include "../sources/JewelsAndStones.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(jewelsAndStones("aA", "aAAbbbb") == 3);
    assert(jewelsAndStones("z", "aAAbbbb") == 0);
    assert(jewelsAndStones("abc", "abcabc") == 6);
    assert(jewelsAndStones("aA", "") == 0);
    assert(jewelsAndStones("a", "a") == 1);
    assert(jewelsAndStones("a", "b") == 0);
    assert(jewelsAndStones("A", "aA") == 1);
    assert(jewelsAndStones("aa", "aaa") == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
