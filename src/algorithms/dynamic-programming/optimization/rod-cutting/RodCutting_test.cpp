// g++ -o test RodCutting_test.cpp && ./test
#define TESTING
#include "sources/RodCutting.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(rodCutting({1, 5, 8, 9, 10, 17, 17, 20}) == 22);
    assert(rodCutting({1, 5}) == 5);
    assert(rodCutting({3, 5, 8}) == 9);
    assert(rodCutting({1}) == 1);
    assert(rodCutting({}) == 0);
    assert(rodCutting({10}) == 10);
    assert(rodCutting({3, 1, 1}) == 9);
    assert(rodCutting({1, 2, 10}) == 10);
    assert(rodCutting({2, 2, 2}) == 6);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
