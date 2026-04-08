// g++ -o MinStack_test MinStack_test.cpp && ./MinStack_test
#define TESTING
#include "../sources/MinStack.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(minStack({5, 3, 7, 1, 8}) == 1);
    assert(minStack({1, 2, 3}) == 1);
    assert(minStack({3, 2, 1}) == 1);
    assert(minStack({42}) == 42);
    assert(minStack({7, 7, 7}) == 7);
    assert(minStack({5, -3, 2, -1}) == -3);
    assert(minStack({1, 5, 10, 20}) == 1);
    assert(minStack({20, 10, 5, 1}) == 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
