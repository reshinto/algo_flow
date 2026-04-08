// g++ -o RemoveAllAdjacentDuplicates_test RemoveAllAdjacentDuplicates_test.cpp && ./RemoveAllAdjacentDuplicates_test
#define TESTING
#include "../sources/RemoveAllAdjacentDuplicates.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(removeAllAdjacentDuplicates("abbaca") == "ca");
    assert(removeAllAdjacentDuplicates("azxxzy") == "ay");
    assert(removeAllAdjacentDuplicates("") == "");
    assert(removeAllAdjacentDuplicates("abc") == "abc");
    assert(removeAllAdjacentDuplicates("aaaaaa") == "");
    assert(removeAllAdjacentDuplicates("aabb") == "");
    assert(removeAllAdjacentDuplicates("a") == "a");
    assert(removeAllAdjacentDuplicates("abba") == "");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
