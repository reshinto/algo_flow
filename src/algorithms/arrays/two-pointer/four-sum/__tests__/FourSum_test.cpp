#include "../sources/FourSum.cpp"
#include <cassert>
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    // Default input [1,0,-1,0,-2,2], target=0 -> 3 unique quadruplets
    {
        auto result = fourSum({1, 0, -1, 0, -2, 2}, 0);
        assert(result.size() == 3);
        assert(std::find(result.begin(), result.end(), std::vector<int>{-2, -1, 1, 2}) != result.end());
        assert(std::find(result.begin(), result.end(), std::vector<int>{-2, 0, 0, 2}) != result.end());
        assert(std::find(result.begin(), result.end(), std::vector<int>{-1, 0, 0, 1}) != result.end());
    }

    // No quadruplets
    assert(fourSum({1, 2, 3, 4}, 100).empty());

    // All zeros -> one unique quadruplet
    {
        auto result = fourSum({0, 0, 0, 0}, 0);
        assert(result.size() == 1);
        assert((result[0] == std::vector<int>{0, 0, 0, 0}));
    }

    // Fewer than four elements
    assert(fourSum({1, 2, 3}, 6).empty());

    // Empty input
    assert(fourSum({}, 0).empty());

    // No duplicates with repeated input
    assert(fourSum({0, 0, 0, 0, 0}, 0).size() == 1);

    // All quadruplets sum to target
    {
        auto result = fourSum({1, 0, -1, 0, -2, 2}, 0);
        for (const auto& quad : result) {
            long long quadSum = 0;
            for (int val : quad) quadSum += val;
            assert(quadSum == 0);
        }
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
