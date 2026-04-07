// g++ -o test MinCostClimbingStairsTabulation_test.cpp && ./test
#include "MinCostClimbingStairsTabulation.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(minCostClimbingStairsTabulation({}) == 0);
    assert(minCostClimbingStairsTabulation({10, 15}) == 10);
    assert(minCostClimbingStairsTabulation({10, 15, 20}) == 15);
    assert(minCostClimbingStairsTabulation({10, 15, 20, 5, 25, 10}) == 30);
    assert(minCostClimbingStairsTabulation({1, 100, 1, 1, 1, 100, 1, 1, 100, 1}) == 6);
    assert(minCostClimbingStairsTabulation({5}) == 0);
    assert(minCostClimbingStairsTabulation({3, 3}) == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
