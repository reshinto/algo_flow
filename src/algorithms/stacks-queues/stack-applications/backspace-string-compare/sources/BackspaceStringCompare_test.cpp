// g++ -o BackspaceStringCompare_test BackspaceStringCompare_test.cpp && ./BackspaceStringCompare_test
#include "BackspaceStringCompare.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(backspaceStringCompare("ab#c", "ad#c") == true);
    assert(backspaceStringCompare("ab##", "c#d#") == true);
    assert(backspaceStringCompare("a#c", "b") == false);
    assert(backspaceStringCompare("", "") == true);
    assert(backspaceStringCompare("a", "a") == true);
    assert(backspaceStringCompare("abc", "a") == false);
    assert(backspaceStringCompare("#a", "a") == true);
    assert(backspaceStringCompare("nzp#o#g", "b#nzp#o#g") == true);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
