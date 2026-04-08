// g++ -o CanJump_test CanJump_test.cpp && ./CanJump_test
#define TESTING
#include "../sources/CanJump.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(canJump({2, 3, 1, 1, 4}) == true);
    assert(canJump({3, 2, 1, 0, 4}) == false);
    assert(canJump({0}) == true);
    assert(canJump({1, 2}) == true);
    assert(canJump({0, 1}) == false);
    assert(canJump({5, 0, 0, 0, 0, 1}) == true);
    assert(canJump({0, 0, 0}) == false);
    assert(canJump({1, 0}) == true);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
