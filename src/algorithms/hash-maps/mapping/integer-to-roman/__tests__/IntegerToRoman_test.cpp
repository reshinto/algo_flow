#include "../sources/IntegerToRoman.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(integerToRoman(1994) == "MCMXCIV");
    assert(integerToRoman(3) == "III");
    assert(integerToRoman(58) == "LVIII");
    assert(integerToRoman(1) == "I");
    assert(integerToRoman(3999) == "MMMCMXCIX");
    assert(integerToRoman(9) == "IX");
    assert(integerToRoman(40) == "XL");
    assert(integerToRoman(1000) == "M");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
