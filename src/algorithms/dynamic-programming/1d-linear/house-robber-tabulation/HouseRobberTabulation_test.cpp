// g++ -o test HouseRobberTabulation_test.cpp && ./test
#define TESTING
#include "sources/HouseRobberTabulation.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(houseRobberTabulation({}) == 0);
    assert(houseRobberTabulation({5}) == 5);
    assert(houseRobberTabulation({2, 7}) == 7);
    assert(houseRobberTabulation({2, 7, 9, 3, 1}) == 12);
    assert(houseRobberTabulation({1, 2, 3, 1}) == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
