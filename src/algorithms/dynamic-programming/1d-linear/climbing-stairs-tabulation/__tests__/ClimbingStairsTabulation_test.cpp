// g++ -o test ClimbingStairsTabulation_test.cpp && ./test
#define TESTING
#include "../sources/ClimbingStairsTabulation.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(climbingStairsTabulation(0) == 1);
    assert(climbingStairsTabulation(1) == 1);
    assert(climbingStairsTabulation(2) == 2);
    assert(climbingStairsTabulation(3) == 3);
    assert(climbingStairsTabulation(4) == 5);
    assert(climbingStairsTabulation(6) == 13);
    assert(climbingStairsTabulation(7) == 21);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
