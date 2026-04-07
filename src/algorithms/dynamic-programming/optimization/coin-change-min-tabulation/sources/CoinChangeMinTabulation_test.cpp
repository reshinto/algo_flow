// g++ -o test CoinChangeMinTabulation_test.cpp && ./test
#include "CoinChangeMinTabulation.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(coinChangeMinTabulation(11, {1, 5, 10, 25}) == 2);
    assert(coinChangeMinTabulation(3, {2}) == -1);
    assert(coinChangeMinTabulation(0, {1}) == 0);
    assert(coinChangeMinTabulation(6, {1, 3, 4}) == 2);
    assert(coinChangeMinTabulation(25, {1, 5, 10, 25}) == 1);
    assert(coinChangeMinTabulation(7, {3, 6}) == -1);
    assert(coinChangeMinTabulation(10, {5}) == 2);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
