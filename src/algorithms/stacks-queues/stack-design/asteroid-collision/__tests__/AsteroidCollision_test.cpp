// g++ -o AsteroidCollision_test AsteroidCollision_test.cpp && ./AsteroidCollision_test
#define TESTING
#include "../sources/AsteroidCollision.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((asteroidCollision({5, 10, -5}) == std::vector<int>{5, 10}));
    assert((asteroidCollision({8, -8}) == std::vector<int>{}));
    assert((asteroidCollision({10, 2, -5}) == std::vector<int>{10}));
    assert((asteroidCollision({-2, -1, 1, 2}) == std::vector<int>{-2, -1, 1, 2}));
    assert((asteroidCollision({1, -1, 1, -1}) == std::vector<int>{}));
    assert((asteroidCollision({1, 2, 3, -10}) == std::vector<int>{-10}));
    assert((asteroidCollision({-5, -3}) == std::vector<int>{-5, -3}));
    assert((asteroidCollision({7}) == std::vector<int>{7}));
    assert((asteroidCollision({}) == std::vector<int>{}));
    assert((asteroidCollision({5, 3, 1, -4}) == std::vector<int>{5}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
