// g++ -o test CoinChangeWays_test.cpp && ./test
#define TESTING
#include "sources/CoinChangeWays.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(coinChangeWays(5, {1, 2, 5}) == 4);
    assert(coinChangeWays(3, {2}) == 0);
    assert(coinChangeWays(0, {1}) == 1);
    assert(coinChangeWays(5, {1, 2}) == 3);
    assert(coinChangeWays(2, {2}) == 1);
    assert(coinChangeWays(1, {2, 5}) == 0);
    assert(coinChangeWays(6, {3}) == 1);
    assert(coinChangeWays(10, {1, 2, 5}) == 10);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
