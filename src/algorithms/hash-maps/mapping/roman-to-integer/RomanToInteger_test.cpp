#include "sources/RomanToInteger.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(romanToInteger("MCMXCIV") == 1994);
    assert(romanToInteger("III") == 3);
    assert(romanToInteger("IV") == 4);
    assert(romanToInteger("IX") == 9);
    assert(romanToInteger("LVIII") == 58);
    assert(romanToInteger("M") == 1000);
    assert(romanToInteger("MMMDCCXLIX") == 3749);
    assert(romanToInteger("XL") == 40);
    assert(romanToInteger("CD") == 400);
    assert(romanToInteger("MMMCMXCIX") == 3999);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
