#include "sources/DailyTemperatures.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Default input [73,74,75,71,69,72,76,73]
    assert((dailyTemperatures({73, 74, 75, 71, 69, 72, 76, 73}) == std::vector<int>{1, 1, 4, 2, 1, 1, 0, 0}));

    // Strictly decreasing -> all zeros
    assert((dailyTemperatures({5, 4, 3, 2, 1}) == std::vector<int>{0, 0, 0, 0, 0}));

    // Strictly increasing -> each waits 1
    assert((dailyTemperatures({1, 2, 3, 4, 5}) == std::vector<int>{1, 1, 1, 1, 0}));

    // All equal -> all zeros
    assert((dailyTemperatures({5, 5, 5, 5}) == std::vector<int>{0, 0, 0, 0}));

    // Single day
    assert((dailyTemperatures({72}) == std::vector<int>{0}));

    // Empty array
    assert(dailyTemperatures({}).empty());

    // Two days: second warmer
    assert((dailyTemperatures({60, 70}) == std::vector<int>{1, 0}));

    // Two days: second cooler
    assert((dailyTemperatures({70, 60}) == std::vector<int>{0, 0}));

    // [30,40,50,60]
    assert((dailyTemperatures({30, 40, 50, 60}) == std::vector<int>{1, 1, 1, 0}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
