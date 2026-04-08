#include "../sources/TrappingRainWater.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Classic example -> 6 total units
    assert(trappingRainWater({0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}).first == 6);

    // Empty array -> 0
    assert(trappingRainWater({}).first == 0);

    // Increasing -> 0
    assert(trappingRainWater({1, 2, 3, 4, 5}).first == 0);

    // Decreasing -> 0
    assert(trappingRainWater({5, 4, 3, 2, 1}).first == 0);

    // Simple valley [3,0,3] -> 3
    {
        auto [totalWater, waterPerIndex] = trappingRainWater({3, 0, 3});
        assert(totalWater == 3);
        assert(waterPerIndex[1] == 3);
    }

    // Asymmetric walls [3,0,1] -> 1
    assert(trappingRainWater({3, 0, 1}).first == 1);

    // Per-index water [0,1,0,2] -> index 2 gets 1 unit
    {
        auto [totalWater, waterPerIndex] = trappingRainWater({0, 1, 0, 2});
        assert(waterPerIndex[2] == 1);
        assert(totalWater == 1);
    }

    // Multiple valleys [4,2,0,3,2,5] -> 9 total
    assert(trappingRainWater({4, 2, 0, 3, 2, 5}).first == 9);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
