/** Correctness tests for the reverseString function. */
#include "ReverseString.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(reverseString("hello") == "olleh");
    assert(reverseString("a") == "a");
    assert(reverseString("") == "");
    assert(reverseString("ab") == "ba");
    assert(reverseString("racecar") == "racecar");
    assert(reverseString("hello world") == "dlrow olleh");
    assert(reverseString("aaaa") == "aaaa");
    assert(reverseString("algorithm") == "mhtirogla");
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
