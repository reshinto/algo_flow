// g++ -o test ClimbingStairsMemoization_test.cpp && ./test
#define TESTING
#include "../sources/ClimbingStairsMemoization.cpp"
#include <cassert>
#include <iostream>
#include <unordered_map>

int climb(int numberOfStairs) {
    std::unordered_map<int, int> memo;
    return climbingStairsMemoization(numberOfStairs, memo);
}

int main() {
    assert(climb(0) == 1);
    assert(climb(1) == 1);
    assert(climb(2) == 2);
    assert(climb(3) == 3);
    assert(climb(4) == 5);
    assert(climb(6) == 13);
    assert(climb(7) == 21);

    int expected[] = {1, 1, 2, 3, 5, 8, 13, 21};
    for (int stairCount = 0; stairCount <= 7; stairCount++) {
        assert(climb(stairCount) == expected[stairCount]);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
