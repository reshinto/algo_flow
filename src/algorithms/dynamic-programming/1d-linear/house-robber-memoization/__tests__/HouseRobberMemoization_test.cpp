// g++ -o test HouseRobberMemoization_test.cpp && ./test
#define TESTING
#include "../sources/HouseRobberMemoization.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(houseRobberMemoization({}) == 0);
    assert(houseRobberMemoization({5}) == 5);
    assert(houseRobberMemoization({3, 10}) == 10);
    assert(houseRobberMemoization({2, 7, 9, 3, 1}) == 12);
    assert(houseRobberMemoization({4, 4, 4, 4}) == 8);
    assert(houseRobberMemoization({1, 2, 3, 1}) == 4);
    assert(houseRobberMemoization({2, 1, 1, 2}) == 4);
    assert(houseRobberMemoization({5, 3, 4, 11, 2}) == 16);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
