#include "sources/FloydCycleDetection.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // Default input [1,3,4,2,2] -> hasCycle=true, cycleStart=2
    {
        auto [hasCycle, cycleStart] = floydCycleDetection({1, 3, 4, 2, 2});
        assert(hasCycle == true);
        assert(cycleStart == 2);
    }

    // [3,1,3,4,2] -> hasCycle=true, cycleStart=3
    {
        auto [hasCycle, cycleStart] = floydCycleDetection({3, 1, 3, 4, 2});
        assert(hasCycle == true);
        assert(cycleStart == 3);
    }

    // Minimal cycle [1,1] -> hasCycle=true, cycleStart=1
    {
        auto [hasCycle, cycleStart] = floydCycleDetection({1, 1});
        assert(hasCycle == true);
        assert(cycleStart == 1);
    }

    // Empty array -> hasCycle=false, cycleStart=-1
    {
        auto [hasCycle, cycleStart] = floydCycleDetection({});
        assert(hasCycle == false);
        assert(cycleStart == -1);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
