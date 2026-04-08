// g++ -o LisTabulation_test LisTabulation_test.cpp && ./LisTabulation_test
#define TESTING
#include "sources/LisTabulation.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(lisLength({10, 9, 2, 5, 3, 7, 101, 18}) == 4);
    assert(lisLength({0, 1, 0, 3, 2, 3}) == 4);
    assert(lisLength({7, 7, 7}) == 1);
    assert(lisLength({1}) == 1);
    assert(lisLength({}) == 0);
    assert(lisLength({1, 2, 3, 4, 5}) == 5);
    assert(lisLength({5, 4, 3, 2, 1}) == 1);
    assert(lisLength({1, 3, 3, 5}) == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
