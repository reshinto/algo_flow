#include "../sources/KadanesAlgorithm.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    {
        auto [maxSum, startIndex, endIndex] = kadanesAlgorithm({-2, 1, -3, 4, -1, 2, 1, -5, 4});
        assert(maxSum == 6 && startIndex == 3 && endIndex == 6);
    }
    {
        auto [maxSum, startIndex, endIndex] = kadanesAlgorithm({1, 2, 3, 4, 5});
        assert(maxSum == 15 && startIndex == 0 && endIndex == 4);
    }
    {
        auto [maxSum, startIndex, endIndex] = kadanesAlgorithm({-5, -3, -8, -1, -4});
        assert(maxSum == -1 && startIndex == 3 && endIndex == 3);
    }
    {
        auto [maxSum, startIndex, endIndex] = kadanesAlgorithm({42});
        assert(maxSum == 42 && startIndex == 0 && endIndex == 0);
    }
    {
        auto [maxSum, startIndex, endIndex] = kadanesAlgorithm({});
        assert(maxSum == 0 && startIndex == -1 && endIndex == -1);
    }
    {
        auto [maxSum, startIndex, endIndex] = kadanesAlgorithm({3, 3, 3, 3});
        assert(maxSum == 12 && startIndex == 0 && endIndex == 3);
    }
    {
        auto [maxSum, startIndex, endIndex] = kadanesAlgorithm({10, 9, -100, 1, 2});
        assert(maxSum == 19 && startIndex == 0 && endIndex == 1);
    }
    {
        auto [maxSum, startIndex, endIndex] = kadanesAlgorithm({1, -100, 8, 9, 10});
        assert(maxSum == 27 && startIndex == 2 && endIndex == 4);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
