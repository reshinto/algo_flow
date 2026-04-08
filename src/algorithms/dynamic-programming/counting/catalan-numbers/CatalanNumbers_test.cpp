// g++ -o test CatalanNumbers_test.cpp && ./test
#define TESTING
#include "sources/CatalanNumbers.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(catalanNumber(0) == 1);
    assert(catalanNumber(1) == 1);
    assert(catalanNumber(2) == 2);
    assert(catalanNumber(3) == 5);
    assert(catalanNumber(5) == 42);
    assert(catalanNumber(8) == 1430);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
