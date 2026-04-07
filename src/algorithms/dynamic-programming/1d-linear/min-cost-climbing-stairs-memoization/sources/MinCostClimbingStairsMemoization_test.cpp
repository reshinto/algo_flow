// g++ -o test MinCostClimbingStairsMemoization_test.cpp && ./test
#include "MinCostClimbingStairsMemoization.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(minCostClimbingStairsMemoization({}) == 0);
    assert(minCostClimbingStairsMemoization({10}) == 0);
    assert(minCostClimbingStairsMemoization({10, 15}) == 10);
    assert(minCostClimbingStairsMemoization({10, 15, 20}) == 15);
    assert(minCostClimbingStairsMemoization({10, 15, 20, 5, 25, 10}) == 30);
    assert(minCostClimbingStairsMemoization({1, 100, 1, 1, 1, 100, 1, 1, 100, 1}) == 6);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
