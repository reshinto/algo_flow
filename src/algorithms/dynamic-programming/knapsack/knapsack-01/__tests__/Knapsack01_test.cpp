// g++ -o test Knapsack01_test.cpp && ./test
#define TESTING
#include "../sources/Knapsack01.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(knapsack01({2, 3, 4, 5}, {3, 4, 5, 6}, 8) == 10);
    assert(knapsack01({1, 2, 3}, {6, 10, 12}, 5) == 22);
    assert(knapsack01({2}, {3}, 1) == 0);
    assert(knapsack01({1}, {1}, 1) == 1);
    assert(knapsack01({}, {}, 10) == 0);
    assert(knapsack01({2, 3}, {4, 5}, 0) == 0);
    assert(knapsack01({3, 5}, {4, 10}, 5) == 10);
    assert(knapsack01({1, 2, 3}, {1, 6, 10}, 5) == 16);
    assert(knapsack01({3}, {5}, 9) == 5);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
