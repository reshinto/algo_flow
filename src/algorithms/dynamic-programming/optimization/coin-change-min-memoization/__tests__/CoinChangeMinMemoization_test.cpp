// g++ -o test CoinChangeMinMemoization_test.cpp && ./test
#define TESTING
#include "../sources/CoinChangeMinMemoization.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(coinChangeMinMemoization(0, {1, 5, 10}) == 0);
    assert(coinChangeMinMemoization(3, {2}) == -1);
    assert(coinChangeMinMemoization(5, {1, 5, 10}) == 1);
    assert(coinChangeMinMemoization(11, {1, 5, 10, 25}) == 2);
    assert(coinChangeMinMemoization(11, {1, 5, 6, 9}) == 2);
    assert(coinChangeMinMemoization(3, {1, 2}) == 2);
    assert(coinChangeMinMemoization(6, {1, 3, 4}) == 2);
    assert(coinChangeMinMemoization(100, {1, 5, 10, 25}) == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
