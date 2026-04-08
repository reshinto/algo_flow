// g++ -o test DecodeWaysMemoization_test.cpp && ./test
#define TESTING
#include "sources/DecodeWaysMemoization.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(decodeWaysMemoization("") == 0);
    assert(decodeWaysMemoization("1") == 1);
    assert(decodeWaysMemoization("0") == 0);
    assert(decodeWaysMemoization("12") == 2);
    assert(decodeWaysMemoization("27") == 1);
    assert(decodeWaysMemoization("30") == 0);
    assert(decodeWaysMemoization("123") == 3);
    assert(decodeWaysMemoization("12321") == 6);
    assert(decodeWaysMemoization("226") == 3);
    assert(decodeWaysMemoization("00") == 0);
    assert(decodeWaysMemoization("1201234") == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
