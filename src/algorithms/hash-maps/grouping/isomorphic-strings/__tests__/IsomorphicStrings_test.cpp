#include "../sources/IsomorphicStrings.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(isomorphicStrings("egg", "add") == true);
    assert(isomorphicStrings("foo", "bar") == false);
    assert(isomorphicStrings("paper", "title") == true);
    assert(isomorphicStrings("ab", "abc") == false);
    assert(isomorphicStrings("", "") == true);
    assert(isomorphicStrings("a", "b") == true);
    assert(isomorphicStrings("badc", "baba") == false);
    assert(isomorphicStrings("abc", "abc") == true);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
