/** Correctness tests for the stringToInteger function. */
#include "StringToInteger.cpp"
#include <cassert>
#include <climits>
#include <iostream>

int main() {
    assert(stringToInteger("42") == 42);
    assert(stringToInteger("   -42") == -42);
    assert(stringToInteger("4193 with words") == 4193);
    assert(stringToInteger("words and 987") == 0);
    assert(stringToInteger("") == 0);
    assert(stringToInteger("   ") == 0);
    assert(stringToInteger("+100") == 100);
    assert(stringToInteger("0") == 0);
    assert(stringToInteger("2147483648") == INT_MAX);
    assert(stringToInteger("-2147483649") == INT_MIN);
    assert(stringToInteger("99999999999999999") == INT_MAX);
    assert(stringToInteger("-99999999999999999") == INT_MIN);
    assert(stringToInteger("  123") == 123);
    assert(stringToInteger("-abc") == 0);
    assert(stringToInteger("2147483647") == INT_MAX);
    assert(stringToInteger("-2147483648") == INT_MIN);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
