// g++ -o RemoveKDigits_test RemoveKDigits_test.cpp && ./RemoveKDigits_test
#include "RemoveKDigits.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(removeKDigits("1432219", 3) == "1219");
    assert(removeKDigits("10200", 1) == "200");
    assert(removeKDigits("10", 2) == "0");
    assert(removeKDigits("12345", 0) == "12345");
    assert(removeKDigits("100", 1) == "0");
    assert(removeKDigits("9", 1) == "0");
    assert(removeKDigits("12345", 3) == "12");
    assert(removeKDigits("1111111", 3) == "1111");
    assert(removeKDigits("9876", 2) == "76");
    assert(removeKDigits("12345", 5) == "0");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
