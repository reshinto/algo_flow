#include "../sources/ThreeSum.cpp"
#include <cassert>
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    // Default input [-1,0,1,2,-1,-4] -> [[-1,-1,2], [-1,0,1]]
    {
        auto result = threeSum({-1, 0, 1, 2, -1, -4});
        assert(result.size() == 2);
        assert(std::find(result.begin(), result.end(), std::vector<int>{-1, -1, 2}) != result.end());
        assert(std::find(result.begin(), result.end(), std::vector<int>{-1, 0, 1}) != result.end());
    }

    // No triplets
    assert(threeSum({1, 2, 3}).empty());

    // Single zero triplet
    {
        auto result = threeSum({0, 0, 0});
        assert(result.size() == 1);
        assert((result[0] == std::vector<int>{0, 0, 0}));
    }

    // Single element
    assert(threeSum({1}).empty());

    // Empty input
    assert(threeSum({}).empty());

    // No duplicates with many zeros
    assert(threeSum({0, 0, 0, 0}).size() == 1);

    // All triplets sum to zero
    {
        auto result = threeSum({-1, 0, 1, 2, -1, -4});
        for (const auto& triplet : result) {
            int tripletSum = triplet[0] + triplet[1] + triplet[2];
            assert(tripletSum == 0);
        }
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
