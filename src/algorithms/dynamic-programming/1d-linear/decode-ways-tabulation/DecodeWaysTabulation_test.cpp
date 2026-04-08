// g++ -o test DecodeWaysTabulation_test.cpp && ./test
#define TESTING
#include "sources/DecodeWaysTabulation.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(decodeWaysTabulation("12321") == 6);
    assert(decodeWaysTabulation("226") == 3);
    assert(decodeWaysTabulation("0") == 0);
    assert(decodeWaysTabulation("10") == 1);
    assert(decodeWaysTabulation("12") == 2);
    assert(decodeWaysTabulation("") == 0);
    assert(decodeWaysTabulation("7") == 1);
    assert(decodeWaysTabulation("00") == 0);
    assert(decodeWaysTabulation("27") == 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
